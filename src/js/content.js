export default class ContentHydration {
  constructor(wrap) {
    this.sections = wrap.querySelectorAll('section')
    this.observer = new IntersectionObserver(this.handleIntersection, { rootMargin: "-100px 0px 0px 0px" })

    this.sections.forEach(section => this.observer.observe(section))
  }

  handleIntersection = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.getContent(entry.target)
        this.observer.unobserve(entry.target)
      }
    })
  }

  getContent = async section => {
    const content = await this.fetchContent(`./content/${section.id}.json`)

    if (!!content) {
      const keys = Object.keys(content)

      keys.forEach(key => {
        const els = section.querySelectorAll([`[data-content="${key}"]`])

        if (!!els) {
          els.forEach(el => key.includes('link') ? el.href = content[`${key}`] : el.innerHTML = content[`${key}`])
        }
      })
    }
  }

  fetchContent = async url => {
    const content = await fetch(url).then(response => response.json())

    return content
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const hydrate = new ContentHydration(document)
})