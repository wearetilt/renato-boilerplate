export default class Background {
  constructor(wrap) {
    this.wrap = wrap
    this.video = this.wrap.querySelector('video')
    this.introHeight = document.querySelector('[data-background="full"]')?.offsetTop
    this.fadeEl = document.querySelector('[data-background="fade"]')
    this.growEl = document.querySelector('[data-background="grow"]')
    this.innerWidth = window.innerWidth
    this.innerHeight = window.innerHeight

    this.instruct = document.querySelector('.js-instruct')
    this.video.playbackRate = 0.5

    window.addEventListener('scroll', this.handleScroll)
  }

  handleResize = () => {
    this.innerWidth = window.innerWidth
    this.innerHeight = window.innerHeight
  }

  handleScroll = () => {
    const introFadeRect = this.fadeEl.getBoundingClientRect()
    const growRect = this.growEl.getBoundingClientRect()
    const introScrollPercentage = (window.pageYOffset / this.introHeight) * 100
    const revealPercentage = window.innerWidth / 100 * introScrollPercentage < window.innerWidth ? window.innerWidth / 100 * introScrollPercentage : window.innerWidth

    const bgOpacityPercentage = introScrollPercentage / 100 < 1 ? introScrollPercentage / 100 : 1
    const instOpacityPercentage = 1 - (introScrollPercentage * 3 / 100)

    this.wrap.style.setProperty('--mask-size', `${revealPercentage}px`)
    this.wrap.style.setProperty('--opacity', bgOpacityPercentage * 0.75)

    this.instruct.style.opacity = instOpacityPercentage

    if (introFadeRect.top < this.innerHeight) {
      const dist = window.pageYOffset - (this.fadeEl.offsetTop - this.innerHeight)
      const fadePercentage = dist / this.innerHeight
      this.wrap.style.setProperty('--opacity', 0.75 - fadePercentage)
    }

    if (introFadeRect.top < 0) this.wrap.style.setProperty('--mask-size', `0px`)

    if (growRect.top < this.innerHeight * 0.5) {
      const dist = window.pageYOffset - (this.growEl.offsetTop - this.innerHeight * 0.5)
      const percentage = (dist / this.growEl.offsetHeight) * 100 < 100 ? (dist / this.growEl.offsetHeight) * 100 : 100
      const opacity = percentage / 100 < 1 ? percentage / 100 : 1
      const reveal = this.innerWidth / 100 * percentage

      this.wrap.style.setProperty('--mask-size', `${reveal}px`)
      this.wrap.style.setProperty('--opacity', opacity)
    }
  }
}