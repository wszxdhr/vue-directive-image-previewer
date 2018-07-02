<template>
  <div ref="vue-directive-image-previewer"
       :disabled="!isShow"
       :key="key"
       class="vue-directive-image-previewer">
    <div class="vue-directive-image-previewer-background" :style="bgStyle" @click="close">
    </div>
    <div class="vue-directive-image-previewer-body" ref="body">
      <img ref="picture" class="vue-directive-image-previewer-img" :style="imgStyle" :src="src[0]" @click="close"/>
    </div>
  </div>
</template>

<script>
  const defaultBackgroundColor = 'rgba(0, 0, 0, 0.5)'
  export default {
    name: 'vue-directive-image-previewer',
    props: {
      src: {
        type: Array,
        default: () => ([])
      },
      background: {
        type: String || Object,
        default: defaultBackgroundColor
      },
      pictureStyle: {
        default: () => ({})
      },
      sourceDom: {},
      transitionDuration: {
        default: 500
      },
      cursor: {
        type: String,
        default: 'pointer'
      }
    },
    data () {
      return {
        isShow: false,
        pictureSize: {},
        imgStyle: {},
        key: `image-previewer-${new Date().valueOf()}`
      }
    },
    methods: {
      init () {
        this.imgStyle.cursor = this.cursor
      },
      close () {
        this.setPictureBegin()
        this.isShow = false
        setTimeout(() => {
          this.$emit('close')
        }, this.transitionDuration)
      },
      open () {
        this.isShow = true
        this.setPictureSize()
      },
      setPictureSize () {
        let result = {}
        let picture = this.$refs.picture
        let pictureRatio = picture.naturalWidth / picture.naturalHeight
        let windowRatio = window.innerWidth / window.innerHeight
        let percent = 0.8
        if (pictureRatio >= windowRatio) {
          let width = window.innerWidth * percent
          result.width = parseInt(width)
          result.height = parseInt(width / pictureRatio)
        } else {
          let height = window.innerHeight * percent
          result.height = parseInt(height)
          result.width = parseInt(height * pictureRatio)
        }
        result.top = (window.innerHeight - parseInt(result.height)) / 2
        result.left = (window.innerWidth - parseInt(result.width)) / 2
        this.pictureSize = result
      },
      setPictureBegin () {
        let rect = this.sourceDom.getBoundingClientRect()
        let {width, height, top, left} = rect
        this.pictureSize = {width: width, height: height, top: top, left: left}
      }
    },
    computed: {
      bgStyle () {
        console.log(this.background)
        let backgroundStyle = typeof this.background === 'string' ? {
          backgroundColor: this.background
        } : {
          backgroundColor: defaultBackgroundColor,
          ...this.background
        }
        return {opacity: this.isShow ? '1' : '0', ...backgroundStyle}
      }
    },
    watch: {
      pictureSize: {
        deep: true,
        handler (val) {
          ['top', 'left', 'width', 'height'].forEach(key => {
            this.$set(this.imgStyle, key, val[key] + 'px')
          })
          this.$set(this.imgStyle, 'transition', this.transitionDuration + 'ms')
          this.$set(this.imgStyle, 'cursor', this.cursor)
        }
      },
      cursor (val) {
        this.imgStyle.cursor = val
      }
    },
    created () {
      this.init()
    },
    mounted () {
      window.addEventListener('resize', () => {
        this.setPictureSize()
      })
    }
  }
</script>

<style lang="scss">
  .vue-directive-image-previewer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &[disabled] {
      pointer-events: none;
    }
    &-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: .5s;
      opacity: 0;
    }
    &-body {
      width: 100%;
      height: 100%;
      z-index: 3;
      img {
        position: absolute;
        z-index: 3;
      }
    }
  }
</style>
