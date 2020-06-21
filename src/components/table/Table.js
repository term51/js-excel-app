import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
// import {$} from '@core/dom'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup']
    })
  }


  toHTML() {
    return createTable(22)
  }

  onClick() {
    // console.log('click')
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  onMousemove(event) {
    // console.log(event)

  }

  onMouseup() {

  }
}
