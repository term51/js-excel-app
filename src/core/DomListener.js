// добавлются изолированные события для элементов
import {capitalize} from '@core/utils'

export class DomListener {
  // в конструктор передаем корневой элемент, на который будут вешаться слушатели
  constructor($root, listeners = []) {
    // проверка, что $root передан
    if (!$root) throw new Error(`No $root provided for DomListener`)
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      // проверка, присутсвует ли метод
      if (!this[method]) throw new Error(`Method ${method} is not implement in ${name}  Component`)
      // убираем баг с bind
      this[method] = this[method].bind(this)
      // Аналог addEventListener
      this.$root.on(listener, this[method]) // bind привязывает контекст для передачи this, создает новую функцию
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      // Аналог removeEventListener
      this.$root.off(listener, this[method]) // bind привязывает контекст для передачи this
    })
  }
}

// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
