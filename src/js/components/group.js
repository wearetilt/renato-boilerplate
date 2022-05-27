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
    this.navObserver = new IntersectionObserver(this.navObseverCallback, { root: this.wrap, threshold: 0.5 })
    this.mainObserver = new IntersectionObserver(this.mainObserverCallback, { rootMargin: `-1000px 0px 0px 0px`, trackVisibility: true, delay: 100 })
    this.innerWidth = window.innerWidth

    this.handleActiveNav()
    document.addEventListener('click', this.handleClick)
    window.addEventListener('resize', this.handleResize)

    this.mainObserver.observe(this.wrap)

    const focusableElements = getKeyboardFocusableElements(this.wrap)

    focusableElements.forEach(el => el.addEventListener('focus', this.handleFocus))
  }

  handleResize = () => this.innerWidth = window.innerWidth

  handleActiveNav = () => this.sections.forEach(section => this.navObserver.observe(section))

  navObseverCallback = entries => {
    entries.forEach(entry => {
      const hash = entry.target.id
      const background = entry.target.dataset.background
      let bgTimeout

      if (entry.isIntersecting) {
        clearTimeout(bgTimeout)
        this.background.classList.remove('is-visible')
        this.navLinks.forEach(link => {
          link.hash === `#${hash}` ? link.classList.add('is-active') : link.classList.remove('is-active')
        })
        bgTimeout = setTimeout(() => {
          this.background.style.backgroundImage = `url(${background})`
          this.background.classList.add('is-visible')
        }, 500)
      } else {
        this.background.classList.remove('is-visible')
      }
    })
  }

  mainObserverCallback = entries => {
    entries.forEach(entry => {
       // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.
      if (typeof entry.isVisible === 'undefined') entry.isVisible = true

      if (entry.isIntersecting) {
        console.log('intersecting')
        this.wrap.classList.add('is-visible')
      } else {
        this.wrap.classList.remove('is-visible')
      }
    })
  }

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