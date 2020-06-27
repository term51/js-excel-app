import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '@core/StoreSubscriber'

export class Excel {
  constructor(selector, options) {
    // $el - черенз $ обозначается DOM нода
    this.$el = $(selector)
    // || Если options.components components не определен, ставим пустой массив
    this.components = options.components || []
    // redux store
    this.store = options.store
    // Важно разместить Observer там, где взаимодействие со всеми компонентами происходит единоразово
    this.emitter = new Emitter()

    //
    this.subscriber = new StoreSubscriber(this.store)
  }

  // возвращает корневую ноду
  getRoot() {
    const $root = $.create('div', 'excel')
    // передача опций всем компонентам
    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }
    // пройдемся по всем переданным классам
    this.components = this.components.map(Component => {
      // $el получает созданный div со статической переменной, хранящей имя класса
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      // // DEBUG - заносим компонент в глобальную область видимости для тестов
      // if (component.name) {
      //   window['c' + component.name] = component
      // }
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  // вывод верстки
  render() {
    // Мультивставка: elem.insertAdjacentHTML(where, html)
    // where[beforeBegin-перед elem, afterBegin-внутрь elem,в начало,beforeEnd-внутрь elem,в конец, afterEnd-после elem]
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>test</h1>`)
    this.$el.append(this.getRoot())
    // подписываем компоненты
    this.subscriber.subscribeComponents(this.components)
    // добавляем слушателей после создания элементов
    this.components.forEach(component => component.init())
  }

  destroy() {
    // Отписка компонентов
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
