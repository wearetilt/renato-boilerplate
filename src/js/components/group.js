import { getKeyboardFocusableElements } from '../helpers/keyboardHelpers'

export default class Group {
  constructor(wrap) {
    this.wrap = wrap
    this.background = this.wrap.querySelector('.js-group-background')
    this.list = this.wrap.querySelector('.js-group-list')
    this.navArea = this.wrap.querySelector('.js-group-nav')
    this.nav = this.wrap.querySelector('.js-group-nav nav')
    this.navLinks = this.wrap.querySelectorAll('.js-group-link')
    this.sections = this.wrap.querySelectorAll('.js-group-section')
    this.innerWidth = window.innerWidth

    document.addEventListener('click', this.handleClick)
    window.addEventListener('resize', this.handleResize)

    const focusableElements = getKeyboardFocusableElements(this.wrap)
    focusableElements.forEach(el => el.addEventListener('focus', this.handleFocus))
  }

  handleResize = () => this.innerWidth = window.innerWidth

  handleActiveNav = () => this.sections.forEach(section => this.navObserver.observe(section))

  handleClick = evt => {
    const link = evt.target.closest('.js-group-link')

    if (!!link) {
      evt.preventDefault()
      const target = Array.from(this.sections).find(item => `#${item.id}` === link.hash)
      const rect = target.getBoundingClientRect()

      scrollY = this.innerWidth >= 1024 
        ? window.pageYOffset + rect.left
        : window.pageYOffset + rect.top

      window.scrollTo(0, scrollY)
    }
  }

  handleFocus = evt => {
    if (this.innerWidth >= 1024 ) {
      evt.preventDefault()

      const groupSection = evt.target.closest('.js-group-section')
      const groupList = evt.target.closest('.js-group-list')

      if (!!groupSection) {
        const scrollY = this.wrap.offsetTop + this.navArea.offsetLeft + groupSection.offsetLeft
        this.wrap.firstElementChild.scrollLeft = 0
        window.scrollTo(0, scrollY)
      }

      if (!!groupList) {
        const scrollY = this.wrap.offsetTop
        window.scrollTo(0, scrollY)
      }
    }
  }
}