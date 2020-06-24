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
