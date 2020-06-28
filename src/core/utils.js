// вспомогательные функции
// Pure functions - не зависят от глобальных
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  // charAt символ по индексу, slice удалит первый символ
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// получить диапазон от начала до конца
export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end] // es6 hack (создается массив из массива и меняется местами)
  }
  return new Array(end - start + 1)
    .fill('')
    .map((_, index) => start + index)
}

// взаимодействие со стораджем
export function storage(key, data) {
  if (!data) {
    // getter
    return JSON.parse(localStorage.getItem(key))
  }
  // setter
  localStorage.setItem(key, JSON.stringify(data))
}

//
export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b) // хак для проверки объектов
  }
  return a === b
}

// перевод строки из верблюжего стиля в тире
export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

// привести к строке со стилями
export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
    .join(';')
}

// оптимизация, задержка перед сохранением в storage
export function debounce(fn, wait) {
  let timeout
  return function (...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// хак, отмена мутации
export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// отмена стандартного поведения
export function preventDefault(event) {
  event.preventDefault()
}
