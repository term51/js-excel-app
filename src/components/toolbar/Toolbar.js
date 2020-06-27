import {createToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  // инициализация state
  prepare() {
    // начальное состояние
    this.initState(defaultStyles)
  }

  get template() {
    // передача состояния
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      // получение data атрибута со стилем
      const value = JSON.parse($target.data.value)
      // оповещение о приминении стиля
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
