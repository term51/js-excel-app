// функции создающие необходимы обхекты action для redux
import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE} from './types'
import {CHANGE_TITLE} from '@/redux/types'

// Action creator
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

// приминить стиль, вернуть массив из Idшников, к которым применить стиль
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  }
}

// печать в хедере, title
export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data
  }
}
