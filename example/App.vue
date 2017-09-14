<template>
  <div id="app">
    <img class="example-pic" v-image-preview="pic" v-for="pic in pictures" :src="pic" alt=""/>
  </div>
</template>

<script>
import Hello from './components/Hello'
import VueDirectiveImagePreviewer from '../dist'

export default {
  name: 'app',
  data () {
    return {
      pictures: [
        '../static/cat.jpg',
        '../static/fox.jpg',
        '../static/lion.jpg',
        '../static/squirrel.jpg',
        '../static/WTF.png'
      ]
    }
  },
  components: {
    Hello
  },
  created () {
    console.log(VueDirectiveImagePreviewer)
  }
}
</script>

<style >
.example-pic {
  width: 28%;
  margin-right: 2%;
}
</style>
