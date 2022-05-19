export default class Stat {
  constructor(wrap) {
    this.wrap = wrap
    this.end = parseInt(wrap.innerHTML)
    this.suffix = wrap.innerHTML.replace(this.end, '')
    this.observer = new IntersectionObserver(this.observerCallback, { threshold: 0.1 })

    this.observer.observe(this.wrap)
  }

  count = () => {
    let startTimestamp = null

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      
      const progress = Math.min((timestamp - startTimestamp) / 1000, 1)
      this.wrap.innerHTML = `${Math.floor(progress * this.end)}${this.suffix ?? ''}`
      
      if (progress < 1) window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  }

  observerCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.count()
      }
    })
  }
}