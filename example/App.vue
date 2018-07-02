<template>
  <div id="app">
    <image-demo class="example-pic" v-image-preview="{
      src: pic,
      background: {
        zIndex: 2,
        backgroundColor: '#fff'
      }
    }" :key="idx" v-for="(pic, idx) in pictures" :src="pic" alt=""></image-demo>
    <img ref="fixedPicture" class="example-pic fixed" v-image-preview="{
      copy: false,
      cursor: 'crosshair'
    }" :src="fixedPicture" alt=""/>
    <!--<image-previewer></image-previewer>-->
  </div>
</template>

<script>
import Hello from './components/Hello'
import VueDirectiveImagePreviewer from '../dist'
import ImageDemo from './components/Image'
import bgComponent from './components/Mask'
// import imagePreviewer from '../src/imagePreviewer.vue'
export default {
  name: 'app',
  data () {
    return {
      pictures: [
        '../static/cat.jpg',
        '../static/fox.jpg',
        '../static/lion.jpg',
        '../static/squirrel.jpg'
      ],
      fixedPicture: '../static/WTF.png',
      bgComponent
    }
  },
  components: {
    Hello, // , imagePreviewer
    ImageDemo
  },
  created () {
    console.log(VueDirectiveImagePreviewer)
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.example-pic {
  width: 300px;
  max-width: 50%;
  margin-right: 500px;
  &.fixed {
    position: fixed;
    right: 10px;
    bottom: 10px;
    margin-right: 0;
  }
}
</style>
