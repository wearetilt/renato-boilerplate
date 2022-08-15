export const getTranslate = (el) => {
  const style = window.getComputedStyle(el)
  const matrix = new DOMMatrixReadOnly(style.transform)

  return {
    x: matrix.m41,
    y: matrix.m42,
  }
}
export const getStyleAttribute = (el, attr) => {
  const style = el.currentStyle || window.getComputedStyle(el)
  const value = parseFloat(style[attr])

  return value
}