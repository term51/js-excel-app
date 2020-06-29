import {$} from '../dom'
import {ActiveRouter} from './ActiveRouter'

//  import {ActiveRouter} from '@core/router/ActiveRouter'

export class Router {
  constructor(selector, routes) {
    if (!selector) throw new Error('Selector is not provided in Router')

    this.$placeholder = $(selector)
    this.routes = routes

    this.page = null
    // привязка к текущему контексту
    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    // если страница уже была загружена, очистить память
    if (this.page) this.page.destroy()
    // очистка от старого шаблона
    this.$placeholder.clear()
    // переключение шаблонов
    const Page = ActiveRouter.path.includes('excel') ? this.routes.excel : this.routes.dashboard
    // инстанс Page
    this.page = new Page(ActiveRouter.param)
    // добавление в компонента в шаблон
    this.$placeholder.append(this.page.getRoot())

    // инициализация компонента
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
