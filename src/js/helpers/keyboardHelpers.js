export const getKeyboardFocusableElements = (element = document) => {
  return [
    ...element.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    )
  ].filter(
    el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden') && window.getComputedStyle(el).visibility !== 'hidden'
  )
}