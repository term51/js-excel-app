import './scss/index.scss'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'

const excel = new Excel('#app', {
  // Передаем компоненты в Excel для последущего рендеринга
  components: [Header, Toolbar, Formula, Table]
})

excel.render()
