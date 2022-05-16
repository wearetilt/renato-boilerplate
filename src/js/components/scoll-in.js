import { setOpacity, setMargin } from "../helpers/scrollHelpers"

export default class ScrollIn {
  constructor(wrap) {
    this.scrollItems = wrap.querySelectorAll('.js-scroll-item')

    this.init()
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  }

  init = () => {
    this.scrollItems.forEach(item => {
      const style = item.currentStyle || window.getComputedStyle(item)
      const margin = parseFloat(style.marginTop)
      item.setAttribute('data-top', margin)
    })
  }

  handleScroll = () => {
    this.scrollItems.forEach(item => {
      const { top } = item.getBoundingClientRect()
      const dataType = item.dataset.type
      const topOffset = window.innerHeight * 0.25
      const bottomOffset = window.innerHeight * 0.75

      if (dataType === 'split') {
        // Trigger animation once item 25% above bottom 25%
        if (top < bottomOffset) item.classList.add('anim-in')
        // Remove animation trigger once item above top 25% or below bottom 25%
        if (top < (topOffset / 3) || top > bottomOffset) item.classList.remove('anim-in')
      } else if (dataType === 'video') {
        if (top < window.innerHeight * 0.25) {}

        if (top < window.innerHeight) {
          let dist = Math.abs(top - window.innerHeight)
          let opacity = dist / (window.innerHeight * 0.5)
          item.style.opacity = opacity < 1 ? opacity : 1
        }

        if (top > window.innerHeight) item.style.opacity = 0
      } else {
        setOpacity(item)
        setMargin(item)
      }      
    })
  }
}