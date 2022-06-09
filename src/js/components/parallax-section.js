import { getStyleAttribute } from '../helpers/cssHelpers'

export default class ParallaxSection {
  constructor(wrap) {
    this.wrap = wrap
    this.innerEl = this.wrap.firstElementChild
    this.items = this.wrap.querySelectorAll('.js-parallax-item')
    this.topOffset = window.innerHeight * 0.15
    this.midOffset = window.innerHeight * 0.5

    this.init()
    window.addEventListener('resize', this.init)

    this.items.forEach(item => item.addEventListener('focusin', this.handleItemFocus))
  }

  init = () => {
    this.items.forEach(item => {
      item.style.opacity = 0
      item.setAttribute('data-top', getStyleAttribute(item, 'paddingTop'))
    })

    window.addEventListener('scroll', this.handleScroll)
  }

  handleItemFocus = evt => {
    evt.preventDefault()

    const item = evt.target.closest('.js-parallax-item')
    const scrollY = this.wrap.offsetTop + this.wrap.parentElement.offsetTop + (item.dataset.top / 3)

    window.scrollTo(0, scrollY)
  }

  handleItemScroll = (item, speedOffset = 0) => {
    const wrapTop = this.wrap.getBoundingClientRect().top
    const { top, height } = item.getBoundingClientRect()
    let opacity
    let translate

    // if (wrapTop + this.wrap.offsetHeight < this.topOffset)
    //   item.style.transform = `translateY(-${item.dataset.top}px)`

    // if (wrapTop < this.topOffset && wrapTop + this.wrap.offsetHeight > this.topOffset) {
    //   let dist = window.scrollY - this.wrap.parentElement.offsetTop - this.wrap.offsetTop + - this.topOffset

    //   let percentage = (dist / item.dataset.top) * 100 * speedOffset > 0 ? (dist / item.dataset.top) * 100 * speedOffset : 0
    //   translate = (item.dataset.top / 100) * percentage * -1

    //   item.style.transform = `translateY(${translate}px)`
    // }

    // if (wrapTop > this.topOffset) item.style.transform = `translateY(0)`

    if (top < this.midOffset) opacity = 1

    // Fade out item once scrolled above middle of viewport
    if (top + (height * 0.75) < this.topOffset && top > this.midOffset)
      opacity = (top + (height * 0.75)) / this.topOffset

    // Fade in item once scrolled above bottom of viewport but below middle
    if (top > this.midOffset && top < window.innerHeight)
      opacity = (window.innerHeight - top) / this.midOffset

    item.style.opacity = opacity
  }

  handleScroll = () => {
    this.items.forEach((item, i) => {
      const speedOffset = i === 0 ? 0 : 0.5
      this.handleItemScroll(item, speedOffset)
    })
  }
}