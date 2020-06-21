// логика связанная с таблицей

// константы для формирования строк
const CODES = {
  A: 65,
  Z: 90
}

// к ячейке
function toCell(col) {
  return `
   <div class="cell" data-col="${col}" contenteditable spellcheck="false"></div>
`
}

// к колонке
function toColumn(col, index) {
  return `
   <div class="column" data-col="${index}" data-type="resizable">
      ${col}
      <div class="col-resize" data-resize="col"></div>
   </div>
`
}

// создание строки
function createRow(content, index = '') {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div class="row" data-type="resizable">
   <div class="row-info">
      ${index}
      ${resizer}
   </div>
   
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
      .fill('') // .map(toCell)
      .map((_, index) => toCell(index))
      .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
