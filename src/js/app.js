const domReady = function() {
  const inits = [
    [".js-skip-trigger", require('./components/skip_to_content')],
    [".js-nav", require('./components/nav')],
    [".js-intro", require('./components/intro')],
    [".js-scroll-in", require('./components/scoll-in')],
    [".js-split-text", require('./components/split-text')],
    [".js-list-section", require('./components/list-section')],
    [".js-parallax-section", require('./components/parallax-section')],
    [".js-staggered-section", require('./components/staggered-section')]
  ]

  Array.from(inits).map(init => {
    let elements = document.querySelectorAll(init[0])

    for (let i = 0; i < elements.length; i++) {
      new init[1].default(elements[i])
    }
  })
}

window.onload = domReady