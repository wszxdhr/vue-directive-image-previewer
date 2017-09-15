import Vue from 'vue'
import ImagePreviewer from '../imagePreviewer.vue'

function getInstance () {
  return (new Vue({
    el: document.createElement('div'),
    render: (h) => h(ImagePreviewer)
  })).$children[0]
}

export default getInstance
