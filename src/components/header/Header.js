import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRouter} from '@core/router/ActiveRouter'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options // передаем в родительский класс
    })
  }

  // сделать задержку для input
  prepare() {
    this.onInput = debounce(this.onInput, 500)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
         <input type="text" class="input" value="${title}">
         <div>
            <div class="button" data-button="remove">
               <i class="material-icons" data-button="remove">delete</i>
            </div>
            <div class="button"  data-button="exit">
               <i class="material-icons" data-button="exit">exit_to_app</i>
            </div>
         </div>
`
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  // клик по кнопкам
  onClick(event) {
    const $target = $(event.target)
    // удалить
    if ($target.data.button === 'remove') {
      const decigion = confirm('Вы действительно хотите удалить таблицу')
      if (decigion) {
        localStorage.removeItem('excel:' + ActiveRouter.param)
        ActiveRouter.navigate('')
      }
      // выйти
    } else if ($target.data.button === 'exit') {
      ActiveRouter.navigate('')
    }
  }
}

