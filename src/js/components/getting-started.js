export default class GettingStarted {
  constructor(wrap) {
    this.wrap = wrap
    this.background = this.wrap.querySelector('.js-getting-started-background')
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

  }
}