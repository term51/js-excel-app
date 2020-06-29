import {createStore} from './createStore'

const initialState = {
  count: 0
}

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }
  return state
}

describe('createStore:', () => {
  let store
  let handler

  // хук перед каждым тестом создавать store
  beforeEach(() => {
    store = createStore(reducer, initialState)
    handler = jest.fn()
  })

  // store проверка на объект
  test('should return store object', () => {
    //  store должен быть
    expect(store).toBeDefined()
    // метод dispatch должен быть
    expect(store.dispatch).toBeDefined
    // метод subscribe должен быть
    expect(store.subscribe).toBeDefined
    // метод getState не должен быть undefined
    expect(store.getState).not.toBeUndefined()
  })

  // getState проверка на объект
  test('should retur object as a state', () => {
    // должен быть объектом
    expect(store.getState()).toBeInstanceOf(Object)
  })

  // вернуть state по умолчанию
  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('should change state if action exists', () => {
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })

  test('should NOT change state if action don\'t exists', () => {
    store.dispatch({type: 'NOT_EXISTING_ACTION'})
    expect(store.getState().count).toBe(0)
  })
  // должна вызваться функция и вызваться с параметрами
  test('should call subscriber function', () => {
    store.subscribe(handler)
    store.dispatch({type: 'ADD'})
    // handler вызывался
    expect(handler).toHaveBeenCalled()
    // handler вызывался со store.getState
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  // после отписки не должен вызываться handler
  test('should NOT call sub if unsubscribe', () => {
    const sub = store.subscribe(handler)

    sub.unsubscribe()
    store.dispatch({type: 'ADD'})
    // handler вызывался
    expect(handler).not.toHaveBeenCalled()
  })

  // тест на асинхронность
  test('should dispatch in async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'})
      }, 500)
      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000)
    })
  })
})
