/**
 * Created by wszxdhr on 2017/9/14.
 */
export default {
  install (Vue, options) {
    console.log(options)
    Vue.directive('image-preview', {
      bind (el, binding, vnode, oldVnode) {
        console.dir(el)
      }
    })
  }
}
