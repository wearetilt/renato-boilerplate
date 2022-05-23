const getKeyboardFocusableElements = (element = document) => {
  return [
    ...element.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    )
  ].filter(
    el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  )
}

const domReady = function() {
  const inits = [
    [".js-skip-trigger", require('./components/skip_to_content')],
    [".js-nav", require('./components/nav')],
    [".js-background", require('./components/background')],
    [".js-scroll-in", require('./components/scoll-in')],
    [".js-split-text", require('./components/split-text')],
    // [".js-list-section", require('./components/list-section')],
    [".js-parallax-section", require('./components/parallax-section')],
    [".js-staggered-section", require('./components/staggered-section')],
    [".js-section", require('./components/section')],
    [".js-video-dialog", require('./components/video')],
    [".js-inline-video", require('./components/inline-video')],
    [".js-group", require('./components/group')],
    [".js-stat", require('./components/stat')]
  ]

  Array.from(inits).map(init => {
    let elements = document.querySelectorAll(init[0])

    for (let i = 0; i < elements.length; i++) {
      new init[1].default(elements[i])
    }
  })

  const focusableElements = getKeyboardFocusableElements()

  focusableElements.forEach(el => el.addEventListener('focus', evt => { 
    evt.target.scrollIntoView()
  }))
}

window.onload = domReady