export default class Nav {
  constructor(wrap) {
    this.wrap = wrap
    this.labels =  Array.from(document.querySelectorAll('.js-nav-label'))
    this.navLinks = this.wrap.querySelectorAll('.js-nav-link')
    this.sections = []
    this.innerHeight = window.innerHeight

    this.navLinks.forEach(link => {
      const section = document.querySelector(link.hash)
      this.sections.push(section)
      link.addEventListener('click', this.handleClick)
    })

    this.handleScroll()
    document.addEventListener('scroll', this.handleScroll)
  }
  
  handleClick = evt => {
    evt.preventDefault()

    const section = document.querySelector(evt.currentTarget.hash)
    if (!!section) {
      const offset = section.id === 'capabilities' ? this.offset : 0
      window.scrollTo(0, section.offsetTop + offset)
    }
  }

  handleScroll = () => {
    this.sections.forEach((sec, i) => {
      const { top, bottom } = sec.getBoundingClientRect()

      if (top < this.innerHeight / 2 && bottom >  this.innerHeight / 2 && !sec.classList.contains('is-active')) {
        this.navLinks.forEach(link => {
          link.hash === `#${sec.id}` ? link.classList.add('is-active') : link.classList.remove('is-active')
        })

        this.labels.forEach(label => {
          label.dataset.section === `#${sec.id}` ? label.classList.add('is-active') : label.classList.remove('is-active')
        })

        this.sections.forEach(section => section.classList.remove('is-active'))
        sec.classList.add('is-active')
      }
    })
  }
}