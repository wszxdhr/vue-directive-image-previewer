<template>
  <div id="app">
    <img class="example-pic" v-image-preview="pic" v-for="pic in pictures" :src="pic" alt=""/>
    <img class="example-pic fixed" v-image-preview="fixedPicture" :src="fixedPicture" alt=""/>
    <!--<image-previewer></image-previewer>-->
  </div>
</template>

<script>
import Hello from './components/Hello'
import VueDirectiveImagePreviewer from '../dist'
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
      fixedPicture: '../static/WTF.png'
    }
  },
  components: {
    Hello// , imagePreviewer
  },
  created () {
    console.log(VueDirectiveImagePreviewer)
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
