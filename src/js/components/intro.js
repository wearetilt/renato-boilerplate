export default class Intro {
  constructor(wrap) {
    this.wrap = wrap
    this.background = this.wrap.querySelector('.js-intro-background')
    this.instruct = this.wrap.querySelector('.js-intro-instruct')
    this.sections = this.wrap.querySelectorAll('.js-intro-section')
    this.video = this.wrap.querySelector('.js-intro-video')
    this.introHeight = this.wrap.querySelector('[data-video="full"]')?.offsetTop
    this.fadeEl = this.wrap.querySelector('[data-video="fade"]')
    this.reveal = window.innerWidth

    this.handleScroll()
    document.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const fadeEl = this.wrap.querySelector('[data-video="fade"]')
    const { top, height } = fadeEl.getBoundingClientRect()
    const scrollPercentage = (window.pageYOffset / this.introHeight) * 100
    const revealPercentage = this.reveal / 100 * scrollPercentage
    const bgOpacityPercentage = scrollPercentage / 100
    const instOpacityPercentage = 1 - (scrollPercentage * 4 / 100)

    this.background.style.setProperty('--mask-size', `${revealPercentage}px`)
    this.background.style.setProperty('--mask-opacity', bgOpacityPercentage)

    this.instruct.style.opacity = instOpacityPercentage

    if (top < window.innerHeight) {
      const dist = window.pageYOffset - (fadeEl.offsetTop - window.innerHeight)
      const fadePercentage = dist / height
      this.background.style.setProperty('--mask-opacity', 1 - fadePercentage)
      this.video.style.opacity = fadePercentage
    }
  }
}