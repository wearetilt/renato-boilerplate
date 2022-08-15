import { getTranslate } from '../helpers/cssHelpers'
export default class Section {
  constructor(wrap) {
    this.wrap = wrap
    this.body = document.body
    this.sectionTrack = this.wrap.querySelector('.js-section-track')
    this.sectionFrames = this.wrap.querySelectorAll('.js-section-frame')
    this.sectionNavArea = this.wrap.querySelector('.js-section-nav')
    this.sectionNav = this.wrap.querySelector('.js-section-nav nav')
    this.sectionNavLinks = this.wrap.querySelectorAll('.js-section-nav nav .js-section-link')
    this.sectionLinks = this.wrap.querySelectorAll('.js-section-link')
    this.sectionBackground = this.wrap.querySelector('.js-section-background')
    this.sectionBackgroundChange = this.wrap.querySelectorAll('[data-background]')
    this.sectionType = this.wrap.dataset.section
    this.isDesktop = window.innerWidth >= 1024
    this.innerWidth = window.innerWidth
    this.innerHeight = window.innerHeight
    this.isSet = []

    this.wrap.addEventListener('click', this.handleClick)

    this.init()
    window.addEventListener('resize', this.init)
  }

  init = () => {
    this.isDesktop = window.innerWidth >= 1024

    if (this.isDesktop) {
      // Set height on wrap to ensure enough scroll space
      this.wrap.style.height = `${this.sectionTrack.offsetWidth - window.innerWidth + window.innerHeight}px`
    } else {
      this.wrap.style.height = 'auto'
      this.sectionTrack.style.transform = `none`
    }

    if (!!this.sectionNavArea) this.deactivateNav()
    document.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrolled = window.pageYOffset > 50
    this.body.classList.toggle('is-scrolled', scrolled)

    if (this.isDesktop) {
      this.handleHorizontalSection()
    } else {
      this.sectionTrack.style.transform = `none`
    }
    if (!!this.sectionNavArea) this.handleNav()
    if (!!this.sectionBackground) this.handleBackground()
  }

  handleHorizontalSection = () => {
    const { top, bottom } = this.wrap.getBoundingClientRect()
    const height = this.wrap.offsetHeight
    let dist = window.pageYOffset - this.wrap.offsetTop

    // Determine the distance scrolled and translate wrap
    if (top <= 0 && bottom > window.innerHeight) this.sectionTrack.style.transform = `translateX(-${dist}px)`
    // Section is not yet at top of viewport so ensure no tranform
    if (top > 0) this.sectionTrack.style.transform = `translateX(0)`
    // Section has passed so ensure transformed all the way
    if (bottom < window.innerHeight) this.sectionTrack.style.transform = `translateX(-${height - window.innerHeight}px)`
  }

  handleBackground = () => {
    const { top, bottom } =  this.wrap.getBoundingClientRect()
    let bgTimeout

    if (top < 0 && bottom > this.innerHeight 
        && !this.sectionBackground.classList.contains('is-fixed')) {
      this.sectionBackground.classList.add('is-fixed')
    } 
    
    if (this.sectionBackground.classList.contains('is-fixed') && (top > 0 || bottom < this.innerHeight)) {
      this.sectionBackground.classList.remove('is-fixed')
    }

    this.sectionBackgroundChange.forEach(el => {
      const rect = el.getBoundingClientRect()
      const pos = this.isDesktop ? rect.left : rect.top
      const end = this.isDesktop ? rect.left + rect.width : rect.top + rect.height
      const max = this.isDesktop ? this.innerWidth : this.innerHeight

      if (pos < max * 0.3 && end > max * 0.3 && !this.isSet[el.id]) {
        this.isSet[el.id] = true // stop transition from retriggering
        clearTimeout(bgTimeout) // clear existing timeout

        // update active nav item
        this.sectionNavLinks.forEach(link =>  
          link.hash === `#${el.id}` ? link.classList.add('is-active') : link.classList.remove('is-active')
        )

        el.classList.add('is-visible') // update section class

        // Set timeout to 
        bgTimeout = setTimeout(() => {
          this.sectionBackground.style.backgroundImage = `url(${el.dataset.background}`
          this.sectionBackground.classList.add('is-visible')
        }, 300)
      } else if ((pos > max * 0.3 || end < max * 0.3) && this.isSet[el.id]) {
        this.isSet[el.id] = false // reset isSet variable
        this.sectionBackground.classList.remove('is-visible') // remove class to enable transition into new bg
        el.classList.remove('is-visible') // remove section class
      }
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
      this.sectionNav.setAttribute('aria-hidden', 'true')
      this.sectionNav.style[posString] = `0`
    }

    if (this.isDesktop && pos < max * 0.1 && min > 0) {
      let dist = window.pageYOffset - this.wrap.offsetTop
      this.activateNav()
      this.sectionNav.style[posString] = `${dist}px`
    }

    if (!this.isDesktop && pos < max) this.activateNav()

    if (this.isDesktop && min === max) {
      this.deactivateNav()
      this.sectionNav.style.top = `${height - window.innerHeight}px`
      this.sectionNav.style.left = `${width - window.innerWidth}px`
    }

    if (!this.isDesktop && min <= max) this.deactivateNav()
  }

  activateNav = () => {
    this.sectionNav.classList.add('is-fixed')
    this.sectionNav.setAttribute('aria-hidden', 'false')

    this.sectionNavLinks.forEach(link => link.setAttribute('tabindex', '0'))
  }

  deactivateNav = () => {
    this.sectionNav.classList.remove('is-fixed')
    this.sectionNav.setAttribute('aria-hidden', 'true')

    this.sectionNavLinks.forEach(link => link.setAttribute('tabindex', '-1'))
  }
}