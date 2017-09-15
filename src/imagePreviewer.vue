<template>
  <div ref="vue-directive-image-previewer"
       class="vue-directive-image-previewer">
    <div class="wrapper"
         @click="$emit('click')"
         :style="wrapperStyle">
    </div>
    <img :src="picture"
         class="vue-directive-image-previewer-pic"
         @click="$emit('click')"
         :style="{
             height: pictureHeight,
             width: pictureWidth,
             top: pictureTop,
             left: pictureLeft
           }"/>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'vue-directive-image-previewer',
    data () {
      return {
        picture: '',
        pictureTop: '0px',
        pictureLeft: '0px',
        pictureHeight: '0px',
        pictureWidth: '0px',
        wrapperStyle: {}
      }
    },
    mounted () {
      console.log('$el = ', this.pictureTop)
    }
  }
</script>
<style lang="scss">
  .vue-directive-image-previewer {
    .wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transition: opacity .5s;
    }
    .vue-directive-image-previewer-pic {
      position: fixed;
      transition: top .5s, left .5s, width .5s, height .5s;
      transform: translate(-50%, -50%);
    }
  }
</style>