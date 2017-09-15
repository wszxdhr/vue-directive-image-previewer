/**
 * Created by wszxdhr on 2017/9/14.
 */
// import Vue from 'vue'
// const ImagePreviewer = Vue.extend(require('./imagePreviewer.vue'))

// import {getRect} from './modules/common.js'
import windowInfo from './modules/windowInfo'
import getInstance from './modules/instance.js'

// global variables
let background = {color: '#000000'}
let animate = {duration: 500}
// let loading = undefined
// let cursor = 'pointer'
// let clickMethod = 'click'

export default {
  install (Vue, options) {
    console.log(options)
    // init
    // let background = typeof options.background === 'string' ? {color: options.background} : (options.background || {color: '#000'})
    Vue.directive('image-preview', {
      bind (el, binding, vnode, oldVnode) {
        console.dir(binding.value, vnode, oldVnode)
        el.onclick = function (evt) {
          onElClicked(evt, el, binding.value)
        }
      }
    })
  }
}

function onElClicked (evt, el, val) {
  // init val
  let pictureUrl = val ? (typeof val === 'string' ? val : val.pictureUrl) : (el.src ? el.src : '')
  // init a vue component
  let rect = getRect(el)
  let instance = getInstance()
  // init data of instance
  instance.picture = pictureUrl
  instance.wrapperStyle = makeWrapperStyle({background, opacity: 0})
  instance.pictureTop = (rect.bottom + rect.top) / 2 + 'px'
  instance.pictureWidth = rect.width + 'px'
  instance.pictureHeight = rect.height + 'px'
  instance.pictureLeft = (rect.right + rect.left) / 2 + 'px'
  // put instance to document.body
  document.body.appendChild(instance.$el)
  let ratio = rect.height / rect.width
  // set final position of picture
  setTimeout(() => {
    instance.wrapperStyle = makeWrapperStyle({background, opacity: 1})
    instance.pictureTop = '50%'
    instance.pictureLeft = '50%'
    instance.pictureWidth = windowInfo.width * 0.9 + 'px'
    instance.pictureHeight = windowInfo.width * 0.9 * ratio + 'px'
  }, 0)
  // set onClick
  instance.$on('click', (evt) => {
    close(evt, instance, el)
  })
}

// when click to close
function close (evt, instance, el) {
  // TODO: 待优化
  let rect = getRect(el)
  instance.wrapperStyle = makeWrapperStyle({background, opacity: 0})
  instance.pictureTop = (rect.bottom + rect.top) / 2 + 'px'
  instance.pictureWidth = rect.width + 'px'
  instance.pictureHeight = rect.height + 'px'
  instance.pictureLeft = (rect.right + rect.left) / 2 + 'px'
  setTimeout(() => {
    // TODO: 处理多个vue-directive-image-previewer
    removeInstance(document.getElementsByClassName('vue-directive-image-previewer')[0])
  }, animate.duration)
}

// remove instance
function removeInstance (el) {
  if (el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

// get element's x and y of window
function getRect (el) {
  // TODO: 兼容
  let rect = el.getBoundingClientRect()
  return rect
}

function makeWrapperStyle (style) {
  let result = {}
  for (let s in style) {
    if (s === 'background') {
      for (let bgKey in style[s]) {
        result[`${s}-${bgKey}`] = style[s][bgKey]
      }
      continue
    }
    result[s] = style[s]
  }
  return result
}
