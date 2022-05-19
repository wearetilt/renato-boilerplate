export default class Group {
  constructor(wrap) {
    this.wrap = wrap
    this.background = this.wrap.querySelector('.js-group-background')
    this.navArea = this.wrap.querySelector('.js-group-nav')
    this.nav = this.wrap.querySelector('.js-group-nav nav')
    this.navLinks = this.wrap.querySelectorAll('.js-group-link')
    this.sections = this.wrap.querySelectorAll('.js-group-section')
    this.navObserver = new IntersectionObserver(this.navObseverCallback, { threshold: 0.5 })
    this.backgroundObserver = new IntersectionObserver(this.backgroundObserverCallback)

    this.minId = null
    this.maxId = null
    this.debounceTimeout = null

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

  // Fast scroll intersection observer fail fix
  applyChanges = () => {
  }

  backgroundObserverCallback = entries => {
    // clearTimeout(this.debounceTimeout)
    entries.forEach(entry => {
      // const entryId = entry.target.id

      // if (this.minId === null || this.maxId === null) {
      //   this.minId = entryId
      //   this.maxId = entryId
      // } else {
      //   this.minId = Math.min(this.minId, entryId)
      //   this.maxId = Math.max(this.maxId, entryId)
      // }

      if (entry.isIntersecting) this.background.classList.add('is-fixed')
    })
    // this.debounceTimeout = setTimeout(this.applyChanges, 500)
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