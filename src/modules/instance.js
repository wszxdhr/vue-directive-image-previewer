import Vue from 'vue'
import ImagePreviewer from '../imagePreviewer.js'

function getInstance () {
  return Vue.extend(ImagePreviewer)
}

export default getInstance
