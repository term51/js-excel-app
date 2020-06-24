export class Emitter {
  constructor(props) {
    this.listeners = {}
  }

  // синонимы dispatch, fire, trigger
  // Уведомления слушателей, если они есть
  // event - любая строчка, ...args - соберет все остальные параметры
  // table.emit('table:select',{a:1}) - пример вызова
  emit(event, ...args) {
    // Если не массив - отмена
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // синонимы on, listen
  // подписка на уведомления или добавление нового слушателя
  // formula.subscribe('table:select', ()=>{}) - пример подписки
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
  }
}
