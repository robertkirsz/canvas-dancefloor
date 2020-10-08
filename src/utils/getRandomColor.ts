/**
 * Returns random color value as a string in hex format
 * @returns {string} Random hex color (e.g. "#000000")
 */
export default () => '#' + Math.floor(Math.random() * 16777215).toString(16)
