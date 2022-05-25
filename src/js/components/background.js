export default class Background {
  constructor(wrap) {
    this.wrap = wrap
    this.video = this.wrap.querySelector('video')
    this.introHeight = document.querySelectorAll('[data-background="full"]')[0]?.offsetTop
    this.fadeEl = document.querySelectorAll('[data-background="fade"]')
    this.maskEl = document.querySelector('[data-background="split"]')
    this.growEl = document.querySelector('[data-background="grow"]')

    this.instruct = document.querySelector('.js-instruct')
    this.video.playbackRate = 0.5

    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const introFadeRect = this.fadeEl[0].getBoundingClientRect()
    const maskRect = this.maskEl.getBoundingClientRect()
    const fadeRect = this.fadeEl[1].getBoundingClientRect()
    const growRect = this.growEl.getBoundingClientRect()
    const introScrollPercentage = (window.pageYOffset / this.introHeight) * 100
    const revealPercentage = window.innerWidth / 100 * introScrollPercentage < window.innerWidth ? window.innerWidth / 100 * introScrollPercentage : window.innerWidth

    const bgOpacityPercentage = introScrollPercentage / 100 < 1 ? introScrollPercentage / 100 : 1
    const instOpacityPercentage = 1 - (introScrollPercentage * 4 / 100)

    this.wrap.style.setProperty('--mask-size', `${revealPercentage}px`)
    this.wrap.style.setProperty('--opacity', bgOpacityPercentage * 0.75)
    this.instruct.style.opacity = instOpacityPercentage

    if (introFadeRect.top < window.innerHeight) {
      const dist = window.pageYOffset - (this.fadeEl[0].offsetTop - window.innerHeight)
      const fadePercentage = dist / this.fadeEl[0].offsetHeight
      this.wrap.style.setProperty('--opacity', 0.75 - fadePercentage)
    }

    if (maskRect.top > window.innerHeight) this.wrap.style.setProperty('--split-mask-opacity', 0)

    if (maskRect.top < window.innerHeight) {
      const dist = window.pageYOffset - (this.maskEl.offsetTop - window.innerHeight)
      const opacity = dist / window.innerHeight < 1 ? dist / window.innerHeight : 1
      const posPercentage = (dist / this.maskEl.offsetHeight) * 100
      const pos = (400 / 100) * posPercentage

      this.wrap.style.setProperty('--opacity', opacity)
      this.wrap.style.setProperty('--split-mask-opacity', 1)
      this.wrap.style.setProperty('--position', `${300 - pos}%`)
      this.wrap.style.setProperty('--position-2', `${300 - pos * 0.80}%`)
    }

    if (maskRect.bottom < window.innerHeight * 0.5) {
      const dist = window.pageYOffset - (this.maskEl.offsetTop + this.maskEl.offsetHeight - (window.innerHeight * 0.5))
      const opacity = dist / (window.innerHeight * 0.5) < 1 ? dist / (window.innerHeight * 0.5) : 1
      this.wrap.style.setProperty('--split-mask-opacity', 1 - opacity)
    }

    if (fadeRect.top < window.innerHeight) {
      const dist = window.pageYOffset - (this.fadeEl[1].offsetTop - window.innerHeight)
      const fadePercentage = dist /  window.innerHeight
      this.wrap.style.setProperty('--opacity', 1 - fadePercentage)
    }

    if (fadeRect.top < 0) this.wrap.style.setProperty('--mask-size', `0`)

    if (growRect.top < window.innerHeight * 0.5) {
      const dist = window.pageYOffset - (this.growEl.offsetTop - window.innerHeight * 0.5)
      const percentage = (dist / this.growEl.offsetHeight) * 100 < 100 ? (dist / this.growEl.offsetHeight) * 100 : 100
      const opacity = percentage / 100 < 1 ? percentage / 100 : 1
      const reveal = window.innerWidth / 100 * percentage

      this.wrap.style.setProperty('--mask-size', `${reveal}px`)
      this.wrap.style.setProperty('--opacity', opacity)
    }
  }
}