import {debounce} from '@core/utils'

export class StateProcessor {
  // client - реализация Dependency Inversion Principle, может быть и localStorage'м или асинхронными запросами на сервер
  constructor(client, delay = 300) {
    this.client = client
    this.listen = debounce(this.listen.bind(this), delay)
  }

  // сохраняет
  listen(state) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}
