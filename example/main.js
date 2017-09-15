// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueDirectiveImagePreviewer from '../src/index.js'
import '../dist/assets/style.css'

Vue.config.productionTip = false

Vue.use(VueDirectiveImagePreviewer, {
  type: 'move',   // copy or move
  background: {     // or : background: '#000'
    color: 'rgba(0, 0, 0, 0.9)' // or rgba or rgb     // or image: 'url(xxx)'
  },
  // transition
  animate: {
    duration: 600,
    delay: 500
  },
  // loading
  loading: {
    image: ''
  },
  // cursor(css)
  cursor: 'pointer',
  clickMethod: 'doubleClick'   // click or doubleClick
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
