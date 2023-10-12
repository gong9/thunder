import { handleCamelCaseString } from '.'

export interface OpsType {
  textContent?: string
  innerHTML?: string
  id?: string
  class?: string
  classList?: string[]
  attrs?: {
    [key: string]: string
  }
  style?: {
    [key: string]: string
  }
  events?: {
    [key: string]: () => void
  }
}

/**
 * setAttributes
 * @param el
 * @param attrs
 */
export const setAttributes = (el: HTMLElement, attrs: OpsType['attrs'] = {}) => {
  Object.keys(attrs).forEach((attrName) => {
    if (attrs[attrName])
      el.setAttribute(attrName, attrs[attrName])
  })
}

const setStyle = (el: HTMLElement, style: OpsType['style'] = {}) => {
  const styleString = Object.keys(style).reduce((pre: string, cur: string) => {
    return `${pre} ${handleCamelCaseString(cur)}:${style[cur]};`
  },
  '')

  el.setAttribute('style', styleString)
}

/**
 * setClassList
 * @param el
 * @param classList
 */
export const setClassList = (el: HTMLElement, classList: string[]) => {
  classList.forEach(className => el.classList.add(className))
}

/**
 * setEventListeners
 * @param el
 * @param events
 */
export const setEventListeners = (el: HTMLElement, events: OpsType['events'] = {}) => {
  Object.keys(events).forEach((eventName) => {
    const eventFn = events[eventName]
    el.addEventListener(eventName, eventFn)
  })
}

/**
 * appendChildren
 * @param node
 * @param children
 */
export const appendChildren = (node: HTMLElement, children: HTMLElement[]) => {
  children.forEach(child => node.appendChild(child))
}

/**
 * createElement
 * @param tag
 * @param options
 * @param children
 * @returns
 */
export const createElement = (tag: string, options: OpsType = {}, children: HTMLElement[] = []) => {
  const result = document.createElement(tag)
  const parent = document.createElement('div')
  parent.appendChild(result)

  if (options.textContent)
    result.textContent = options.textContent
  if (options.innerHTML)
    result.innerHTML = options.innerHTML
  if (options.id)
    result.id = options.id
  if (options.class)
    result.className = options.class

  setAttributes(result, options.attrs)
  setClassList(result, options.classList || [])
  setEventListeners(result, options.events)
  setStyle(result, options.style || {})

  appendChildren(result, children)

  return parent
}
/**
 * create
 * @param tags
 * @returns
 */
export const create = (...tags: string[]) => {
  return tags.map(tag => (options: OpsType = {}, children: HTMLElement[] = []) => {
    return createElement(tag, options, children)
  })
}

export const a = create('a')[0]
export const article = create('article')[0]
export const aside = create('aside')[0]
export const b = create('b')[0]
export const br = create('br')[0]
export const button = create('button')[0]
export const canvas = create('canvas')[0]
export const div = create('div')[0]
export const fieldset = create('fieldset')[0]
export const footer = create('footer')[0]
export const form = create('form')[0]
export const h1 = create('h1')[0]
export const h2 = create('h2')[0]
export const h3 = create('h3')[0]
export const h4 = create('h4')[0]
export const h5 = create('h5')[0]
export const h6 = create('h6')[0]
export const header = create('header')[0]
export const hr = create('hr')[0]
export const i = create('i')[0]
export const iframe = create('iframe')[0]
export const img = create('img')[0]
export const input = create('input')[0]
export const label = create('label')[0]
export const li = create('li')[0]
export const link = create('link')[0]
export const main = create('main')[0]
export const meta = create('meta')[0]
export const nav = create('nav')[0]
export const ol = create('ol')[0]
export const option = create('option')[0]
export const p = create('p')[0]
export const progress = create('progress')[0]
export const script = create('script')[0]
export const section = create('section')[0]
export const select = create('select')[0]
export const span = create('span')[0]
export const style = create('style')[0]
export const sub = create('sub')[0]
export const sup = create('sup')[0]
export const svg = create('svg')[0]
export const table = create('table')[0]
export const tbody = create('tbody')[0]
export const td = create('td')[0]
export const textarea = create('textarea')[0]
export const th = create('th')[0]
export const tr = create('tr')[0]
export const ul = create('ul')[0]
export const video = create('video')[0]
