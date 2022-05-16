import { setOpacity, setMargin } from "../helpers/scrollHelpers"
import { getStyleAttribute } from "../helpers/cssHelpers"

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
      p.setAttribute('data-top', getStyleAttribute(p, 'marginTop'))
    })
  }

  handleScroll = () => {
    this.paragraphs.forEach(p => {
      setOpacity(p)
      setMargin(p)
    })
  }
}