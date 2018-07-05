/**
 * Created by wszxdhr on 2017/9/14.
 */
import Vue from 'vue'
import imagePreviewer from './imagePreviewer.vue'
import {merge} from 'lodash'
const ImagePreviewer = Vue.extend(imagePreviewer)

// import {getRect} from './modules/common.js'
// import windowInfo from './modules/windowInfo'

export default {
  install (Vue, options) {
    options = options || {}
    options.copy = typeof options.copy === 'boolean' ? options.copy : true
    // init
    Vue.directive('image-preview', {
      bind (el, binding, vnode, oldVnode) {
        binding.value = binding.value || {}
        let {src, background, copy, cursor, animate} = binding.value
        el.addEventListener('click', handleClick({
          vnode,
          src,
          background: merge(options.background || {}, background || {}),
          copy: typeof copy === 'boolean' ? copy : options.copy,
          cursor: cursor || options.cursor,
          animate: merge(options.animate || {}, animate || {})
        }))
      },
      update (el, binding, vnode) {
      }
    })
  }
}

const handleClose = (vm, sourceDom, copy) => {
  return () => {
    if (!copy) {
      sourceDom.style.visibility = ''
    }
    vm.$destroy()
    document.body.removeChild(vm.$el)
  }
}

const handleClick = ({vnode, src: bindingSrc, background, copy = true, cursor = 'pointer', animate = {duration: 500}}) => {
  return (evt) => {
    let instance = new ImagePreviewer()
    let src = bindingSrc || vnode.data.attrs.src || vnode.componentInstance.src
    let rect = evt.target.getBoundingClientRect()
    let {width, height, top, left} = rect
    instance.pictureSize = {width: width, height: height, top: top, left: left}
    instance.cursor = cursor
    instance.animate = animate
    instance.vm = instance.$mount()
    instance.vm.src = [src]
    instance.vm.background = background
    instance.dom = instance.vm.$el
    instance.sourceDom = evt.target
    if (!copy) {
      evt.target.style.visibility = 'hidden'
    }
    instance.vm.$on('close', handleClose(instance.vm, evt.target, copy))
    instance.vm.$nextTick(() => {
      setTimeout(() => {
        instance.vm.open()
      }, 0)
    })
    document.body.appendChild(instance.dom)
  }
}
