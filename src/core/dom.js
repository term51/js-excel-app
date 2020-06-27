// утилита для взаимодействия с DOM деревом, аля jQuery
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  // замена innerHTML
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  // добавить текст
  text(text) {
    if (typeof text !== 'undefined') {
      // setter
      this.$el.textContent = text
      return this
    }
    // если input
    if (this.$el.tagName.toLowerCase() === 'input') {
      // getter
      return this.$el.value.trim()
    }
    // getter
    return this.$el.textContent.trim()
  }

  // чистка HTML
  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  // node - element
  append(node) {
    // Если node является инстансом класса Dom
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  // Геттер для dataset
  get data() {
    return this.$el.dataset
  }

  // поиск родителя по data атрибуту
  closest(selector) {
    return $(this.$el.closest(selector)) // возращает нативный элемент, поэтому оборачиваем в конструктор
  }

  // получить координаты элемента
  getCoords() {
    return this.$el.getBoundingClientRect() // получить набор координат
  }

  // querySelector
  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  // querySelectorAll
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  // работа со стилями
  css(styles = {}) {
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
  }

  getStyles(styles = []) {
    // получить стили в виде объекта (res-результат,s-название текущего стиля)
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  // возвраащет id, если ничего не передавать.
  // если передать параметр возвращает объект со строкой и столбцом
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    // возврат chain
    return this
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }
}

// возвращаем новый инстанс класса Dom, через $
export function $(selector) {
  return new Dom(selector)
}

// функция создает DOM элемент с классами
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
