import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize, isCell, matrix, nextSelector} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {parse} from '@core/parse'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup', 'keydown', 'input'],
      ...options
    })
  }


  toHTML() {
    return createTable(22, this.store.getState())
  }

  // хук, подготовка к инициализация
  prepare() {
    this.selection = new TableSelection()
  }

  // создание хука (срабатывает после рендеринга DOM дерева). Переписывается метод init из родительского компонента
  init() {
    // поскольку родительский метод init нужен, вызываем его
    super.init()
    // при инициализации найти первую ячейку, для выделения
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    // подписка на события в formula
    this.$on('formula:input', value => {
      // задать атрибут для ячейки с результатом
      this.selection.current
        .attr('data-value', value)
        .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  // выбрать ячейку и отправить значение в формулу
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    // стили для отправки в redux
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    console.log('styles', styles)
    this.$dispatch(actions.changeStyles(styles))
  }

  onClick() {
    // console.log('click')
  }

  // изменение размера в таблице
  async resizeTable(event) {
    try {
      // получить данные через промис
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('resize error', e.message)
    }
  }

  // клик по элементам компонента таблица
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      // если клик с зажатым шифтом
      if (event.shiftKey) {
        // получить массив из элементов, что должны быть выделены
        const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onMousemove(event) {
    // console.log(event)

  }

  onMouseup() {

  }

  // Клики по клавиатуре
  onKeydown(event) {
    // проверяемые клавиши
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    // получаем key из event через деструктуризацию
    const {key} = event
    // если нажата клавиша из списка и без шифта
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      // получить id текущей ячейки
      const id = this.selection.current.id(true)
      // поиск следующей ячейки
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateTextInStore($(event.target).text())
  }
}
