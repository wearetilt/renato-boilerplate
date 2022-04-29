import { setOpacity, setMargin } from "../helpers/scrollHelpers"

export default class ScrollIn {
  constructor(wrap) {
    this.scrollItems = wrap.querySelectorAll('.js-scroll-item')
    this.innerHeight = window.innerHeight

    this.init()
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  }

  init = () => {
    this.scrollItems.forEach(item => {
      item.setAttribute('data-top', item.computedStyleMap().get('margin-top').value)
    })
  }

  handleScroll = () => {
    this.scrollItems.forEach(item => {
      const { top } = item.getBoundingClientRect()
      const splitTitle = item.dataset.titleType === 'split'
      const topOffset = this.innerHeight * 0.25
      const bottomOffset = this.innerHeight * 0.75

      if (splitTitle) {
        // Trigger animation once item 25% above bottom 25%
        if (top < bottomOffset) item.classList.add('anim-in')
        // Remove animation trigger once item above top 25% or below bottom 25%
        if (top < (topOffset / 3) || top > bottomOffset) item.classList.remove('anim-in')
      } else {
        setOpacity(item)
        setMargin(item)
      }      
    })
  }
}