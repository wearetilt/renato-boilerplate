export const setOpacity = (
  el,
  topOffset = window.innerHeight * 0.25,
) => {
  const { top } = el.getBoundingClientRect()
  const midOffset = window.innerHeight * 0.5
  let opacity

  if (top < 0) el.style.opacity = 0

  // Fade out item once scrolled above middle of viewport
  if (top < topOffset) opacity = top / topOffset

  // Fade in item once scrolled above bottom of viewport but below middle
  if (top > midOffset && top < window.innerHeight)
    opacity = (window.innerHeight - top) / midOffset

  if (top > window.innerHeight) el.style.opacity = 1

  el.style.opacity = opacity
}

export const setMargin = (el) => {
  const { top } = el.getBoundingClientRect()
  let margin

  if (top < 0) el.style.marginTop = `0px`

  if (top < window.innerHeight * 0.75 && top > window.innerHeight * 0.25) {
    let dist = window.scrollY - (top + window.scrollY - window.innerHeight * 0.75)
    let percentage = (dist / top) * 100
    margin = el.dataset.top - (el.dataset.top / 100) * percentage

    el.style.marginTop = `${margin > 0 ? margin : 0}px`
  }

  if (top > window.innerHeight) el.style.marginTop = `${el.dataset.top}px`
}