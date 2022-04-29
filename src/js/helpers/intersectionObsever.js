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
    let target = entry.target
    let passed = entry.boundingClientRect.y < 50

    console.log(entry)

    target.style.opacity = entry.intersectionRatio

    // target.classList.toggle('is-intersecting', intersecting)
    // target.classList.toggle('has-intersected', passed)
  })
}