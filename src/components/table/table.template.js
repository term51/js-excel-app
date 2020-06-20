// логика связанная с таблицей

// константы для формирования строк
const CODES = {
  A: 65,
  Z: 90
}

// к ячейке
function toCell(select = false) {
  if (select) {
    return `
   <div class="cell selected" contenteditable spellcheck="false"></div>
`
  } else {
    return `
   <div class="cell" contenteditable spellcheck="false"></div>
`
  }
}

// к колонке
function toColumn(col) {
  return `
   <div class="column">${col}</div>
`
}

// создание строки
function createRow(content, index = '') {
  return `
  <div class="row">
   <div class="row-info">${index}</div>
   <div class="row-data">${content}</div>
  </div>
`
}

// к символу
function toChar(_, index) { // _ когда не используем входящий параметр
  return String.fromCharCode(CODES.A + index)
}

// создание всей таблицы
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  // Создание колонок
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar) // Создание букв для колонок из char кодов
      .map(toColumn) // создание колонки, аналог .map(el => createCol(el))
      .join('') // преобразование массива к строке
  // Первая строка из заглавий колонок
  rows.push(createRow(cols))


  for (let i = 0; i < rowsCount; i++) {
    // остальные строки
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
