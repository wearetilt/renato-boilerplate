import { setOpacity, setMargin } from "../helpers/scrollHelpers"

export default class StaggeredSection {
  constructor(wrap) {
    this.wrap = wrap
    this.paragraphs = this.wrap.querySelectorAll('p')

    this.init()
    window.addEventListener('scroll', this.handleScroll)
  }

  init = () => {
    this.paragraphs.forEach(p => {
      p.style.opacity = 0
      p.setAttribute('data-top', p.computedStyleMap().get('margin-top').value)
    })
  }

  handleScroll = () => {
    this.paragraphs.forEach(p => {
      setOpacity(p)
      setMargin(p)
    })
  }
}