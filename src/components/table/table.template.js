// логика связанная с таблицей

// константы для формирования строк
import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}


const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

// к ячейке
function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`
    const data = state.dataState[id]
    // формирование строки со стилями
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
    <div class="cell"
     data-col="${col}" 
     data-type="cell"
     data-id="${id}" 
     data-value="${data || ''}"
     contenteditable
     spellcheck="false"
     style="${styles}; width: ${getWidth(state.colState, col)}">
        ${parse(data) || ''}
     </div>
   `
  }
}

// к колонке
function toColumn({col, index, width}) {
  return `
   <div class="column" data-col="${index}" data-type="resizable" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
   </div>
`
}

// создание строки
function createRow(content, index = '', state) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div class="row" data-type="resizable" data-row="${index}" style="height: ${getHeight(state, index)}">
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

// высчитывает для определенного индекса из state новое значение
function withWidthFrom(state) {
  return function (col, index) {
    return {col, index, width: getWidth(state.colState, index)}
  }
}

// создание всей таблицы
export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  // Создание колонок
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar) // Создание букв для колонок из char кодов
    .map(withWidthFrom(state))
    .map(toColumn)// создание колонки, аналог .map(el => toCell(el))
    .join('') // преобразование массива к строке
  // Первая строка из заглавий колонок
  rows.push(createRow(cols, '', {}))

  for (let row = 0; row < rowsCount; row++) {
    // остальные строки
    const cells = new Array(colsCount)
      .fill('') // .map(toCell)
      .map(toCell(state, row)) //
      .join('')
    rows.push(createRow(cells, row + 1, state.rowState))
  }

  return rows.join('')
}
