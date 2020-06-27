import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  // static - вызов переменной без создания инстанса класса
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      // на что подписаться
      subscribe: ['currentText'],
      ...options // передаем в родительский класс
    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  // какие слушатели создаются в конструкторе, такие и методы
  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

// Описания в Table.js
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
