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
