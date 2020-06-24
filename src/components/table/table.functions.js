// хелперы для таблицы
import {range} from '@core/utils'

// должен изменить размер?
export function shouldResize(event) {
  return event.target.dataset.resize
}

// ячейка?
export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

// матрица ID-шников для выделения ячеек
export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  // массив ID нужных ячеек для выделения
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}


// в зависимости от нажатой клавиши вернет следующую ячейку
export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
  }
  return `[data-id="${row}:${col}"]`
}
