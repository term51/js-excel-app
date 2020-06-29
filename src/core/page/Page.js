// класс для отрисовки компонентов
export class Page {
  constructor(params) {
    // если в параметрах что-то есть, оставить, иначе задать ID из даты
    this.params = params || Date.now().toString()
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented')
  }

  // хук, после рендера страницы
  afterRender() {
  }

  destroy() {

  }
}


