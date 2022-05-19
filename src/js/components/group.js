export default class Group {
  constructor(wrap) {
    this.wrap = wrap
    this.background = this.wrap.querySelector('.js-group-background')
    this.navArea = this.wrap.querySelector('.js-group-nav')
    this.nav = this.wrap.querySelector('.js-group-nav nav')
    this.navLinks = this.wrap.querySelectorAll('.js-group-link')
    this.sections = this.wrap.querySelectorAll('.js-group-section')
    this.navObserver = new IntersectionObserver(this.navObseverCallback, { threshold: 0.5 })
    this.backgroundObserver = new IntersectionObserver(this.backgroundObserverCallback, { trackVisibility: true, delay: 100 })

    this.debounceTimeout = {}

    this.handleActiveNav()
    document.addEventListener('click', this.handleClick)

    this.backgroundObserver.observe(this.background)
  }

  handleActiveNav = () => this.sections.forEach(section => this.navObserver.observe(section))

  navObseverCallback = entries => {
    entries.forEach(entry => {
      const hash = entry.target.id
      const background = entry.target.dataset.background
      let intersecting = entry.isIntersecting
      let bgTimeout

      this.background.classList.remove('is-visible')

      if (intersecting) {
        clearTimeout(bgTimeout)
        this.background.classList.remove('is-visible')
        this.navLinks.forEach(link => {
          link.hash === `#${hash}` ? link.classList.add('is-active') : link.classList.remove('is-active')
        })
        bgTimeout = setTimeout(() => {
          this.background.style.backgroundImage = `url(${background})`
          this.background.classList.add('is-visible')
        }, 500)
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
}