// вспомогательные функции
// Pure functions - не зависят от глобальных
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  // charAt символ по индексу, slice удалит первый символ
  return string.charAt(0).toUpperCase() + string.slice(1)
}
