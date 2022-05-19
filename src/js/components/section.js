import { getTranslate } from '../helpers/cssHelpers'
export default class Section {
  constructor(wrap) {
    this.wrap = wrap
    this.sectionTrack = this.wrap.querySelector('.js-section-track')
    this.sectionFrames = this.wrap.querySelectorAll('.js-section-frame')
    this.sectionNavArea = this.wrap.querySelector('.js-section-nav')
    this.sectionNav = this.wrap.querySelector('.js-section-nav nav')
    this.sectionLinks = this.wrap.querySelectorAll('.js-section-link')
    this.sectionBackground = this.wrap.querySelector('.js-section-bg')
    this.sectionType = this.wrap.dataset.section
    this.isDesktop = window.innerWidth >= 1024

    this.wrap.addEventListener('click', this.handleClick)

    this.init()
    window.addEventListener('resize', this.init)
  }

  init = () => {
    this.isDesktop = window.innerWidth >= 1024

    if (this.isDesktop) {
      // Set height on wrap to ensure enough scroll space
      this.wrap.style.height = `${this.sectionTrack.offsetWidth - window.innerWidth + window.innerHeight}px`
      if (this.sectionType === "glob") this.initGlobs()
    } else {
      this.wrap.style.height = 'auto'
      this.sectionTrack.style.transform = `none`
      this.resetGlobs()
    }

    document.addEventListener('scroll', this.handleScroll)
  }

  initGlobs = () => {
    this.sectionFrames.forEach(frame => {
      Array.from(frame.children).map(glob => {
        let translate = (window.innerHeight / 100) * 45
        glob.classList.contains('js-section-title')
          ? glob.firstElementChild.setAttribute('data-translate', getTranslate(glob.firstElementChild).y)
          : glob.firstElementChild.setAttribute('data-translate', translate)
      })
    })
  }

  resetGlobs = () => {
    this.sectionFrames.forEach(frame => {
      Array.from(frame.children).map(glob => glob.firstElementChild.removeAttribute('data-translate'))
    })
  }

  handleScroll = () => {
    if (this.isDesktop) {
      this.handleHorizontalSection()
    } else {
      this.sectionTrack.style.transform = `none`
    }
    if (this.sectionType === "glob") this.handleGlobs()
    if (!!this.sectionNavArea) this.handleNav()
  }

  handleHorizontalSection = () => {
    const { top, bottom } = this.wrap.getBoundingClientRect()
    const height = this.wrap.offsetHeight
    let dist = window.pageYOffset - this.wrap.offsetTop

    // Determine the distance scrolled and translate wrap
    if (top < 0 && bottom > window.innerHeight) this.sectionTrack.style.transform = `translateX(-${dist}px)`
    // Section is not yet at top of viewport so ensure no tranform
    if (top > 0) this.sectionTrack.style.transform = `translateX(0)`
    // Section has passed so ensure transformed all the way
    if (bottom < window.innerHeight) this.sectionTrack.style.transform = `translateX(-${height - window.innerHeight}px)`
  }

  handleGlobs = () => {
    this.sectionFrames.forEach(frame => {
      const title = frame.querySelector('.js-section-title')
      const globs = Array.from(frame.children)

      if (this.isDesktop) {
        const { left, right, width } = frame.getBoundingClientRect()
        // If frame has not reached the left edge of viewport title should have no translate value
        if (left >= 0) title.style.transform = `translateX(0)`
        // If frame is active translate title by distance travelled to keep in view
        if (left < 0 && right > (window.innerWidth / 2)) title.style.transform = `translateX(${Math.abs(left)}px)`
        // if frame has passed fully translate title
        if (right < (window.innerWidth / 2)) title.style.transform = `translateX(${width - (window.innerWidth / 2)}px)`
      } else {
        title.style.transform = `none`
      }
      
      globs.map(glob => {
        const child = glob.firstElementChild
        const { left, top } = glob.getBoundingClientRect()
        const max = this.isDesktop ? window.innerWidth : window.innerHeight
        const pos = this.isDesktop ? left : top
        const inThreshold = max * 0.33
        const outThreshold = max * 0.15
        const transData = child.dataset.translate

        // // If glob more than 2/3 across the viewport ensure fully visible
        // if (pos < inThreshhold) glob.style.opacity = 1
        // If glob has entered viewport from the right and less 2/3 across
        if (pos >= inThreshold && pos > outThreshold && pos < max) {
          // Calculate the distance scrolled
          let dist = max - pos
          // Use the distance to calculate the percentage
          let percentage = (dist / max) * 100 * 1.5
          let opacity = percentage * 1.33 < 100 ? 1 / 100 * percentage * 1.25 : 1
          let translation

          glob.style.opacity = opacity

          if (this.isDesktop) {
            if (glob === title) {
              // console.log((transData / 100), percentage)
              translation = percentage < 100 ? transData - (transData / 100 * percentage) : 0
            } else {
              translation = percentage < 100 ? transData / 100 * percentage : transData
            }

            child.style.transform = `translateY(${translation}px)`
          } else {
            child.style.transform = `translateY(0px)`
          }
        }

        if (pos < outThreshold) {
          let dist = outThreshold - pos
          let percentage = (dist / max) * 100
          let opacity = (100 - percentage) * 0.01

          glob.style.opacity = opacity
        }
        
        if (this.isDesktop && pos < outThreshold) {
          let dist = outThreshold - pos
          let percentage = (dist / max) * 100
          let translation = glob === title ? 0 : transData - (window.innerHeight * 0.25 / 100) * percentage

          child.style.transform = `translateY(${translation}px)`
        }
      })
    })
  }

  handleNav = () => {
    const { top, left, right, bottom, width, height } = this.sectionNavArea.getBoundingClientRect()
    const pos = this.isDesktop ? left : top
    const posString = this.isDesktop ? 'left' : 'bottom'
    const max = this.isDesktop ? window.innerWidth : window.innerHeight
    const min = this.isDesktop ? right : bottom

    if (pos > max * 0.1) {
      this.sectionNav.classList.remove('is-fixed')
      this.sectionNav.style[posString] = `0`
    }

    if (this.isDesktop && pos < max * 0.1 && min > 0) {
      let dist = window.pageYOffset - this.wrap.offsetTop
      this.sectionNav.classList.add('is-fixed')
      this.sectionNav.style[posString] = `${dist}px`
    }

    if (!this.isDesktop && pos < max) this.sectionNav.classList.add('is-fixed')

    if (this.isDesktop && min === max) {
      this.sectionNav.classList.remove('is-fixed')
      this.sectionNav.style.top = `${height - window.innerHeight}px`
      this.sectionNav.style.left = `${width - window.innerWidth}px`
    }

    if (!this.isDesktop && min <= max) this.sectionNav.classList.remove('is-fixed')
  }

  handleBackground = () => {

  }
}