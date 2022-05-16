export default class Background {
  constructor(wrap) {
    this.wrap = wrap
    this.introHeight = document.querySelector('[data-video="full"]')?.offsetTop
    this.fadeEl = document.querySelector('[data-video="fade"]')
    this.updateEl = document.querySelector('[data-bg-src]')
    this.instruct = document.querySelector('.js-instruct')

    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const introFadeRect = this.fadeEl.getBoundingClientRect()
    const introScrollPercentage = (window.pageYOffset / this.introHeight) * 100
    const revealPercentage = window.innerWidth / 100 * introScrollPercentage

    const bgOpacityPercentage = introScrollPercentage / 100
    const instOpacityPercentage = 1 - (introScrollPercentage * 4 / 100)

    this.wrap.style.setProperty('--mask-size', `${revealPercentage}px`)
    this.wrap.style.setProperty('--mask-opacity', bgOpacityPercentage)
    this.instruct.style.opacity = instOpacityPercentage

    if (introFadeRect.top < window.innerHeight) {
      const dist = window.pageYOffset - (this.fadeEl.offsetTop - window.innerHeight)
      const fadePercentage = dist / introFadeRect.height
      this.wrap.style.setProperty('--mask-opacity', 1 - fadePercentage)
    }

    // Update src and fade in
    const updatedRect = this.updateEl.getBoundingClientRect()

    if(updatedRect.top < window.innerHeight) {
      this.wrap.style.backgroundImage = `url(${this.updateEl.dataset.bgSrc})`
    }
  }
}