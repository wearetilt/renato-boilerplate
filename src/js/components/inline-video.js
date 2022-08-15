export default class InlineVideo {
  constructor(wrap) {
    this.observer = new IntersectionObserver(this.lazyLoad)

    this.observer.observe(wrap)
  }

  lazyLoad = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        for (let source in entry.target.children) {
          const videoSource = entry.target.children[source]

          if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE")
            videoSource.src = videoSource.dataset.src
        }

        entry.target.load()
        this.observer.unobserve(entry.target)
      }
    })
  }
}