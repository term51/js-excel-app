export class ActiveRouter {
  // Вернет текущий путь в адресной строке
  static get path() {
    return window.location.hash.slice(1) // удалить решетку
  }

  static get param() {
    return ActiveRouter.path.split('/')[1]
  }

  static navigate(path) {
    window.location.hash=path
  }
}
