import { setOpacity } from "../helpers/scrollHelpers"

export default class ParallaxSection {
  constructor(wrap) {
    this.wrap = wrap
    this.innerEl = this.wrap.firstElementChild
    this.fixedContent = this.wrap.querySelector('.js-parallax-fixed-content')
    this.items = this.wrap.querySelectorAll('.js-parallax-item')
    this.innerHeight = window.innerHeight
    this.topOffset = this.innerHeight * 0.15
    this.midOffset = this.innerHeight * 0.5

    this.init()
    window.addEventListener('scroll', this.handleScroll)
  }

  init = () => {
    this.wrap.style.height = `${this.wrap.offsetHeight + 400}px`
    this.innerEl.style.height = `100vh`
    this.fixedContent.style.opacity = 0
    this.items.forEach(item => {
      item.style.opacity = 0
      item.setAttribute('data-top', item.computedStyleMap().get('margin-top').value)
    })
  }

  handleItemScroll = (item, speedOffset = 1) => {
    const wrapTop = this.wrap.getBoundingClientRect().top
    const { top, height } = item.getBoundingClientRect()
    let opacity
    let margin

    if (wrapTop < this.topOffset) {
      let dist = window.scrollY - (this.wrap.offsetTop - this.topOffset)
      let percentage = (dist / item.dataset.top) * 100 * speedOffset
      margin = item.dataset.top - (item.dataset.top / 100) * percentage

      item.style.marginTop = `${margin > 0 ? margin : 0}px`
    }

    // Fade out item once scrolled above middle of viewport
    if (top + (height * 0.75) < this.topOffset) opacity = (top + (height * 0.75)) / this.topOffset

    // Fade in item once scrolled above bottom of viewport but below middle
    if (top > this.midOffset && top < window.innerHeight)
      opacity = (window.innerHeight - top) / this.midOffset

    item.style.opacity = opacity
  }

  handleScroll = () => {
    setOpacity(this.fixedContent, this.topOffset)
    this.items.forEach((item, i) => {
      const speedOffset = i === 0 ? 0.6 : 1
      this.handleItemScroll(item, speedOffset)
    })
  }
}