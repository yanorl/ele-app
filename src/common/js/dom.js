export function getData (el, name, value) {
  const prefix = 'data-'
  name = prefix + name
  if (value) {
    return el.setAttribute(name, value)
  } else {
    return el.getAttribute(name)
  }
}