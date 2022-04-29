export default class SkipToContent {
  constructor(wrap) {
    wrap.addEventListener('click', this.handleSkipClick)
  }

  handleSkipClick = (evt) => {
    evt.preventDefault()

    const targetId = evt.currentTarget.hash
    const target = document.querySelector(targetId)
    target.focus()
  }
}