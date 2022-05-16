import Plyr from 'plyr'

export default class Video {
  constructor(wrap) {
    this.wrap = wrap
    this.video = wrap.querySelector('.js-video')
    this.videoDismiss = this.wrap.querySelector('.js-video-dismiss')
    this.playTrigger = document.querySelector('.js-video-trigger')
    this.player

    this.playTrigger.addEventListener('click', this.initPlayer)
    this.videoDismiss.addEventListener('click', this.destroyPlayer)
  }

  initPlayer = () => {
    this.player = new Plyr(this.video)
    this.wrap.setAttribute('open', true)
    this.player.play()
  }

  destroyPlayer = () => {
    this.wrap.removeAttribute('open')
    this.player.destroy()
  }
}