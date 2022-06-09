export const createObserver = (margin = '0px', threshold = 1) => {
  const options = {
    root: null,
    rootMargin: margin,
    threshold: threshold,
    // trackVisibility: true,
    // delay: 100
  }

  return new IntersectionObserver(handleIntersect, options)
}

const handleIntersect = (entries) => {
  entries.forEach(entry => {
    let intersecting = entry.isIntersecting
    let passed = entry.boundingClientRect.y < 50

    if (intersecting) {
      console.log('something')
    }

    console.log(entry.boundingClientRect.y, window.innerHeight)

    entry.target.classList.toggle('is-intersecting', intersecting)
    entry.target.classList.toggle('has-intersected', passed)
  })
}