import Splitting from 'splitting'
import { createObserver } from '../helpers/intersectionObsever'

export default class SplitList {
  constructor(wrap) {
    this.wrap = wrap
    this.items = this.wrap.querySelectorAll('li')
    this.height = wrap.offsetHeight
    this.observer = createObserver('0px', 0.5)

    this.initAnim()
    window.addEventListener('resize', this.initAnim)
  }

  initAnim = () => {
    if (this.height < window.innerHeight * 0.66) {
      // this.items.forEach(li => this.observer.unobserve(li))
      this.initSplitAnim()
    } else {
      this.observer.unobserve(this.wrap)
      this.initItemAnim()
    }
  }

  initSplitAnim = () => {
    const options = { target: this.wrap, by: 'items' }
    Splitting(options)

    this.observer.observe(this.wrap)
  }

  initItemAnim = () => this.items.forEach(li => this.observer.observe(li))
}