// get informations of window
// TODO: 兼容
let windowInfo = {
  height: window.innerHeight,
  width: window.innerWidth
}

window.addEventListener('resize', (evt) => {
  windowInfo.height = window.innerHeight
  windowInfo.width = window.innerWidth
})

module.exports = windowInfo
