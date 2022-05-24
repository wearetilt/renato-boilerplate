import Plyr from 'plyr'
import { getKeyboardFocusableElements } from '../helpers/keyboardHelpers'
export default class Video {
  constructor(wrap) {
    this.wrap = wrap
    this.video = wrap.querySelector('.js-video')
    this.videoDismiss = this.wrap.querySelector('.js-video-dismiss')
    this.playTrigger = document.querySelectorAll('.js-video-trigger')
    this.player
    this.activeElement

    this.playTrigger.forEach(trigger => trigger.addEventListener('click', this.initPlayer))
    this.videoDismiss.addEventListener('click', this.destroyPlayer)
  }

  initPlayer = () => {
    this.activeElement = document.activeElement // cache currently active element
  
    this.player = new Plyr(this.video)
    this.wrap.setAttribute('aria-hidden', 'false')
    this.player.play()

    const focusableElements = getKeyboardFocusableElements(this.wrap)
    this.wrap.addEventListener('keydown', this.handleKeydown)

    this.videoDismiss.focus()
  }

  destroyPlayer = () => {
    this.wrap.setAttribute('aria-hidden', 'true')
    this.player.destroy()

    this.wrap.removeEventListener('keydown', this.handleKeydown)
    this.activeElement.focus()
  }

  handleKeydown = evt => {
    const focusableElements = getKeyboardFocusableElements(this.wrap)
    const activeItem = document.activeElement

    if(!evt.shiftKey) {
      const i = focusableElements.indexOf(activeItem)
      console.log(focusableElements)
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

    if (evt.keyCode === 27) this.destroyPlayer()
  }
}