window.onload = function() {
  var innerWidth = window.innerWidth
  var innerHeight = window.innerHeight
  var scrollSections = document.querySelectorAll('.js-section')

  scrollSections.forEach(function(section) {
    var subSections = section.querySelectorAll('.js-section-sub')
    var height = 0
    // Calculate actual height of section
    subSections.forEach(function(sub) {
      height += sub.offsetWidth
    })

    section.style.height = `${height - innerWidth + innerHeight}px`
  })

  var handleScroll = function(evt) {
    scrollSections.forEach(function(section) {
      var rect = section.getBoundingClientRect()
      var height = section.innerHeight
      var nav = section.querySelector('nav')

      if (rect.top < 0 && rect.bottom > innerHeight) {
        // Do horizontal scrolling things here
        var dist = (evt.pageY - evt.clientY) - section.offsetTop
        section.style.transform = `translateX(-${dist}px)`
        if (!!nav) {
          nav.style.left = dist > innerWidth ? `${dist}px` : '100%'
        }
      }

      // Section is not yet at top of viewport so ensure no tranform
      if (rect.top > 0) section.style.transform = `translateX(0)`
      // Section has passed so ensure transformed all the way
      if (rect.bottom < innerHeight) section.style.transform = `translateX(-${height - innerHeight}px)`
    })
  }

  window.addEventListener('wheel', handleScroll)

  var handleLinkClick = function(evt) {
    evt.preventDefault()

    var section = evt.currentTarget.closest('.js-section')
    var targetId = evt.currentTarget?.getAttribute('href')
    var target = section.querySelector(targetId)
    var rect = target.getBoundingClientRect()

    window.scrollTo({ 
      top: window.scrollY + section.getBoundingClientRect().top + rect.left,
      left: 0,
      behavior: 'auto'
    })

    var transformString = section.style.transform
    var transform = transformString?.match(/\d+/) ? parseFloat(transformString.match(/\d+/)[0]) : 0
    section.style.transform = `translateX(-${rect.left}px)`
  }

  scrollSections.forEach(function(section) {
    var sectionLinks = section.querySelectorAll('.js-section-link')

    sectionLinks.forEach(function(link) {
      link.addEventListener('click', handleLinkClick)
    })
  })
}