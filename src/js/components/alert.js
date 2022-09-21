import { getKeyboardFocusableElements } from '../helpers/keyboardHelpers'

export default class Alert {
  constructor(wrap) {
    this.wrap = wrap
    this.triggers = document.querySelectorAll('.js-alert-trigger')
    this.dismiss = wrap.querySelector('.js-alert-dismiss')
    this.activeElement

    this.triggers.forEach(trigger => trigger.addEventListener('click', this.handleTriggerClick))
  }

  handleTriggerClick = evt => {
    evt.preventDefault()

    this.activeElement = document.activeElement // cache currently active element
    this.wrap.setAttribute('aria-hidden', 'false')
    const type = evt.currentTarget.dataset?.type || 'default'
    const content = this.wrap.querySelectorAll('[data-type]')
    const activeContent = this.wrap.querySelector(`[data-type="${type}"]`)

    content.forEach(el => el.setAttribute('aria-hidden', 'true'))
    activeContent.setAttribute('aria-hidden', 'false')

    const focusableElements = getKeyboardFocusableElements(this.wrap)
    this.wrap.addEventListener('keydown', this.handleKeydown)

    focusableElements[0].focus()
    this.wrap.addEventListener('click', this.handleBgClick)
    this.dismiss.addEventListener('click', this.handleDismiss)
  }

  handleDismiss = () => {
    this.wrap.setAttribute('aria-hidden', 'true')

    this.wrap.removeEventListener('keydown', this.handleKeydown)
    this.activeElement.focus()
  }

  handleBgClick = evt => {
    const content = evt.target.closest('.js-alert-inner')

    if (!content) this.handleDismiss()
  }

  handleKeydown = evt  => {
    const focusableElements = getKeyboardFocusableElements(this.wrap)
    const activeItem = document.activeElement

    if (evt.keyCode === 27) this.handleDismiss()        

    if(!evt.shiftKey) {
      const i = focusableElements.indexOf(activeItem)
      // If not the last element in focusableElements carry on as you were
      if (i + 1 < focusableElements.length) return

      // Else focus first item
      evt.preventDefault()

      focusableElements[0].focus()
    }

    if(evt.shiftKey) {
      const i = focusableElements.indexOf(activeItem)
      // If not the first element in focusableElements carry on as you were
      if (i > 0) return

      // Else focus last item
      evt.preventDefault()

      focusableElements[focusableElements.length - 1].focus()
    }
  }
}