const domReady = function() {
  const inits = []

  Array.from(inits).map(init => {
    let elements = document.querySelectorAll(init[0])

    for (let i = 0; i < elements.length; i++) {
      new init[1].default(elements[i])
    }
  })
}

window.onload = domReady