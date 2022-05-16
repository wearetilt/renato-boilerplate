import { getStyleAttribute } from '../helpers/cssHelpers'

export default class SplitList {
  constructor(wrap) {
    this.wrap = wrap
    this.innerEl = this.wrap.firstElementChild
    this.list = this.wrap.querySelector('.js-list')
    this.listItems = this.list.querySelectorAll('li')

    this.listTop = this.list.offsetTop
    this.fixedPos = getStyleAttribute(this.innerEl, 'top')
    this.sectionSpacing = getStyleAttribute(this.wrap, 'paddingTop')
    this.offsets = []
    this.activeEl = 0
    this.percentage = 0

    this.setupList()
    window.addEventListener('scroll', this.handleScroll)
  }

  setupList = () => {
    for(let i = 0; i < this.listItems.length; i++) {
      const top = this.listItems[i].getBoundingClientRect()?.top
      const prevTop = i > 0 ? this.listItems[i - 1].getBoundingClientRect().top : 0
      const offset = window.innerHeight / 3
      const margin = top > prevTop ? offset : offset * 2
      const deg = i % 2 === 1 ? '15deg' : '-15deg'
      this.offsets[i] = { margin, deg }
    }

    for(let j = 0; j < this.listItems.length; j++) {
      this.listItems[j].style.marginTop = `${this.offsets[j].margin}px`
      this.listItems[j].style.transform = `rotate(${this.offsets[j].deg})`
    }

    const height = this.wrap.offsetHeight + this.fixedPos
    this.wrap.style.height = `${height}px`
    this.innerEl.style.height = `100vh`
  }

  handleScroll = () => {
    // If top is less than section top style attribute reset active index to 0
    if (this.innerEl.getBoundingClientRect().top < this.fixedPos)  this.activeEl = 0
    
    // If top of section relative to the viewport < the top style attribute
    if (this.innerEl.getBoundingClientRect().top === this.fixedPos) {
      for(let i = 0; i < this.listItems.length; i++) {
        if (i === this.activeEl) {
          // const top = this.listItems[i].offsetTop + this.fixedPos
          const top = this.listItems[i].offsetTop
          // const dist = window.pageYOffset  - (this.wrap.offsetTop - this.fixedPos + this.sectionSpacing)
          const dist = window.pageYOffset - (this.wrap.offsetTop - this.list.offsetTop)

          if (this.percentage < 100) {
            this.percentage = (dist / top) * 100 * 0.3
            const margin = this.offsets[i].margin
            const marginPercentage = (margin / 100) * this.percentage < margin
              ? (margin / 100) * this.percentage
              : margin
            const updatedMargin = `${margin - marginPercentage}px`
            const deg = i % 2 === 1 ? 15 : -15
            const updatedRotation = `${deg - ((deg / 100) * this.percentage)}deg`
            const opacity = this.percentage / 100

            this.listItems[i].style.marginTop = updatedMargin
            this.listItems[i].style.opacity = opacity
            this.listItems[i].style.transform = `rotate(${updatedRotation})`
          } else {
            this.percentage = 0
            this.activeEl++

            this.listItems[i].style.marginTop = 0
            this.listItems[i].style.opacity = 1
            this.listItems[i].style.transform = `rotate(0)`
          }
        }
      }     
    }
  }
}