import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    // $el - черенз $ обозначается DOM нода
    this.$el = $(selector)
    // || Если options.components components не определен, ставим пустой массив
    this.components = options.components || []
  }

  // возвращает корневую ноду
  getRoot() {
    const $root = $.create('div', 'excel')

    // пройдемся по всем переданным классам
    this.components = this.components.map(Component => {
      // $el получает созданный div со статической переменной, хранящей имя класса
      const $el = $.create('div', Component.className)
      const component = new Component($el)
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
    // добавляем слушателей после создания элементов
    this.components.forEach(component => component.init())
  }
}
