/**
 * Detects if the browser is interactive through touch
 */
export function hasTouch() {
  return (
    "ontouchstart" in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  )
}
