export default class Nav {
  constructor(wrap) {
    this.wrap = wrap
    this.labels =  Array.from(document.querySelectorAll('.js-nav-label'))
    this.navLinks = this.wrap.querySelectorAll('.js-nav-link')
    this.offset = window.innerWidth >= 1024 ? window.innerWidth * 0.8 : 0
    const options = {
      rootMargin: '-100px 0px',
      threshold: 0
    }
    this.observer = new IntersectionObserver(this.handleIntersect, options)

    this.navLinks.forEach(link => {
      const section = document.querySelector(link.hash)

      if (!!section) this.observer.observe(section)

      link.addEventListener('click', this.handleClick)
    })
  }
  
  handleClick = evt => {
    evt.preventDefault()

    const section = document.querySelector(evt.currentTarget.hash)
    if (!!section) {
      const offset = section.id === 'capabilities' ? this.offset : 0
      window.scrollTo(0, section.offsetTop + offset)
    }
  }

  handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Update active link
        this.navLinks.forEach(link => link.classList.remove('is-active'))
        const activeLink = Array.from(this.navLinks).find(link => link.hash === `#${entry.target.id}`)
        activeLink.classList.add('is-active')
        // Update section label
        this.labels.map(label => {
          const activeLabel = this.labels.find(l => l.dataset.section === activeLink.hash) ?? this.labels[0]
          label === activeLabel
            ? label.classList.add('is-active') 
            : label.classList.remove('is-active')
        })
      }
    })
  }
}