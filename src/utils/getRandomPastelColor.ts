/**
 * Returns random color pastel color in HSL format
 * @returns {string} Random HSL color (e.g. "hsl(180, 50%, 50%)")
 */
export default () => {
  const hue = 360 * Math.random()
  const saturation = 25 + 70 * Math.random()
  const lightness = 85 + 10 * Math.random()

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
