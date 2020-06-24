export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = [] // массив для храения выбранных ячеек
    this.current = null
  }

  // $el instanceof DOM === true
  select($el) {
    this.clear()
    // фокусировать и добавить класс для выделения ячейки
    $el.focus().addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el
  }

  // очистка массива и удаление класса className
  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  // выделить группу элементов
  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
}
