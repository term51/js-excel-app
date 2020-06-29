import {storage} from '@core/utils'

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  console.log(model)
  return `
   <li class="db__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>
         ${new Date(model.openedDate).toLocaleDateString()}
         ${new Date(model.openedDate).toLocaleTimeString()}
      </strong>
   </li>
`
}

// excel: id
function getAllKeys() {
  const keys = []
  // пройтись по всем ключам localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    // если в имени ключа нет excel - пропустить
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  // получить все ключи из localStorage
  const keys = getAllKeys()

  if (!keys.length) return `<p>Вы пока не создали ни одной таблицы</p>`

  return `
      <div class="db__list-header">
         <span>Table name</span>
         <span>Date</span>
      </div>
      <ul class="db__list">
        ${keys.map(toHTML).join('')}
      </ul>
`
}
