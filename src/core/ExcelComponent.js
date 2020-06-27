import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter // теперь у васех наследников есть один и тот же объект Observer
    this.subscribe = options.subscribe || [] //
    this.store = options.store // теперь у васех наследников есть один и тот же объект Redux store
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

  // методы для Redux store
  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Сюла приходят только изменения по тем полям, на которые мы подписались
  storeChanged() {
  }

  //
  isWatching(key) {
    return this.subscribe.includes(key)
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
    this.unsubscribers.forEach(unsub => unsub()) // ?#
  }
}
