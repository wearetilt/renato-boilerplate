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
    this.navObserver = new IntersectionObserver(this.navObseverCallback, { threshold: 0.1, trackVisibility: true, delay: 100 })
    this.backgroundObserver = new IntersectionObserver(this.backgroundObserverCallback, { trackVisibility: true, delay: 100 })

    this.handleActiveNav()
    document.addEventListener('click', this.handleClick)

    this.backgroundObserver.observe(this.background)

    const focusableElements = getKeyboardFocusableElements(this.wrap)

    focusableElements.forEach(el => el.addEventListener('focus', this.handleFocus))
  }

  handleActiveNav = () => this.sections.forEach(section => this.navObserver.observe(section))

  navObseverCallback = entries => {
    entries.forEach(entry => {
      const hash = entry.target.id
      const background = entry.target.dataset.background
      let bgTimeout

      // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.
      if (typeof entry.isVisible === 'undefined') entry.isVisible = true
      console.log(entry)

      if (entry.isIntersecting && entry.isVisible) {
        console.log('anything')
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

  backgroundObserverCallback = entries => {
    entries.forEach(entry => {
       // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.
      if (typeof entry.isVisible === 'undefined') entry.isVisible = true

      if (entry.isIntersecting && entry.isVisible) {
        this.background.classList.add('is-fixed')
      } else {
        this.background.classList.remove('is-fixed')
      }
    })
  }

  handleClick = evt => {
    const link = evt.target.closest('.js-group-link')

    if (!!link) {
      evt.preventDefault()
      const target = Array.from(this.sections).find(item => `#${item.id}` === link.hash)
      const rect = target.getBoundingClientRect()

      scrollY = window.innerWidth >= 1024 
        ? window.pageYOffset + rect.left
        : window.pageYOffset + rect.top

      window.scrollTo(0, scrollY)
    }
  }

  handleFocus = evt => {
    if (window.innerWidth >= 1024 ) {
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