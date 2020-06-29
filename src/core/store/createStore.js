 // Redux, Store
export function createStore(rootReducer, initialState = {}) {
  //  type:'__INIT__' - системный тип, идет инициализация
  // {...initialState} - чтобы небыло мутаций
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    subscribe(fn) {
      listeners.push(fn)
      // return () => {
      //   listeners = listeners.filter(l => l !== fn)
      // }
      return {
        // удаление подписок
        unsubscribe() {
          listeners = listeners.filter(l => l !== fn)
        }
      }
    },
    dispatch(action) {
      // переопределение стейта
      state = rootReducer(state, action)
      // оповещение всех слушателей
      listeners.forEach(listener => listener(state))
    },
    getState() {
      return JSON.parse(JSON.stringify(state)) // отмена мутации
    }
  }
}
