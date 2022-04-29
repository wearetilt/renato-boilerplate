export default class Nav {
  constructor(wrap) {
    this.wrap = wrap
    this.navLinks = this.wrap.querySelectorAll('.js-nav-link')
    const options = {
      root: null,
      rootMargin: '-100px 0px',
      threshold: 0
    }
    this.observer = new IntersectionObserver(this.handleIntersect, options)

    this.navLinks.forEach(link => {
      const section = document.querySelector(link.hash)
      if (!!section) this.observer.observe(section)
    })
  }

  handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.navLinks.forEach(link => link.classList.remove('is-active'))
        const activeLink = Array.from(this.navLinks).find(link => link.hash === `#${entry.target.id}`)
        activeLink.classList.add('is-active')
      }
    })
  }
}