export const createObserver = (margin, threshold) => {
  const options = {
    root: null,
    rootMargin: margin || '0px',
    threshold: threshold || 1
  }

  return new IntersectionObserver(handleIntersect, options)
}

const handleIntersect = (entries) => {
  entries.forEach(entry => {
    let intersecting = entry.isIntersecting
    let passed = entry.boundingClientRect.y < 50

    entry.target.classList.toggle('is-intersecting', intersecting)
    entry.target.classList.toggle('has-intersected', passed)
  })
}