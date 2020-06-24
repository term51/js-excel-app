import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter // теперь у васех наследников есть один и тот же объект Observer
    this.unsubscribers = []
    this.prepare() // +хук, вызывает перед init
  }

  // хук до init
  prepare() {
  }


  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // уведомление слушателей о событиях event, $ глобальный метод
  $emit(event, ...arg) {
    this.emitter.emit(event, ...arg)
  }

  // подписка на события event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // Хук, срабатывает после рендеринга DOM дерева
  init() {
    // добавляются дом слушатели
    this.initDOMListeners()
  }

  // метод для очистки памяти
  destroy() {
    // чистка слушателей
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
