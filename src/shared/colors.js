const depth = require('../lib/helpers/colorDepth')

const colors16 = new Map([
  ['blue', 34],
  ['gray', 37],
  ['green', 32],
  ['olive', 33],
  ['orangered', 91],
  ['plum', 97],
  ['red', 31]
])

const colors256 = new Map([
  ['blue', 21],
  ['gray', 244],
  ['green', 34],
  ['olive', 142],
  ['orangered', 202],
  ['plum', 182],
  ['red', 196]
])

function getColor (color) {
  const colorDepth = depth.getColorDepth()
  if (!colors256.has(color)) {
    throw new Error(`Invalid color ${color}`)
  }
  if (colorDepth >= 256) {
    const code = colors256.get(color)
    return (message) => `\x1b[38;5;${code}m${message}\x1b[39m`
  }
  if (colorDepth >= 16) {
    const code = colors16.get(color)
    return (message) => `\x1b[${code}m${message}\x1b[39m`
  }
  return (message) => message
}

function bold (message) {
  if (depth.getColorDepth() >= 16) {
    return `\x1b[1m${message}\x1b[22m`
  }

  return message
}

module.exports = {
  getColor,
  bold
}
