<template>
  <div ref="vue-directive-image-previewer"
       :disabled="!isShow"
       :key="key"
       class="vue-directive-image-previewer"
       :style="{zIndex}">
      <!--遮罩层-->
    <div class="vue-directive-image-previewer-background" :style="bgStyle" @click="close">
    </div>
      <!--图片主体-->
    <div class="vue-directive-image-previewer-body" ref="body">
      <img ref="picture" class="vue-directive-image-previewer-img" :style="imgStyle" :src="src[0]" @click="close"/>
    </div>
  </div>
</template>

<script>
  const defaultBackgroundColor = 'rgba(0, 0, 0, 0.5)'
  const percent = 0.8
  export default {
    name: 'vue-directive-image-previewer',
    props: {
      // 整体wrap的z-index
      zIndex: {
        type: Number,
        default: 1
      },
      // 图片url
      src: {
        type: Array,
        default: () => ([])
      },
      // 背景mask样式，也可以是字符串，代表颜色
      background: {
        type: String || Object,
        default: defaultBackgroundColor
      },
      // 原始dom，也就是加上了指令的dom
      sourceDom: {},
      // 光标css
      cursor: {
        type: String,
        default: 'pointer'
      },
      // transition相关信息，包括delay，duration，func（timing function）
      animate: {
        type: Object,
        default: () => ({
          duration: 500
        })
      },
      maxWidth: { // 预览图的最大宽度
        type: [String, Number]
      },
      maxHeight: { // 预览图的最大高度
        type: [String, Number]
      },
      previewSize: { // 预览图与原图的比例
        type: [String, Number]
      }
    },
    data () {
      return {
        isShow: false,
        // 图片尺寸信息
        pictureSize: {},
        // 图片样式
        imgStyle: {},
        key: `image-previewer-${new Date().valueOf()}`,
        status: '' // 'opening', 'opened', 'closing', 'closed'
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
        }, this.animate.duration + this.animate.delay)
      },
      open () {
        this.isShow = true
        this.setPictureSize()
      },
      // 拼装transition信息
      handleTransition ({duration, delay, func}) {
        return `${duration || 0}ms ${delay || 0}ms ${func || ''}`
      },
      // 设置展示完成时的状态
      setPictureSize () {
        let result = {}
        let picture = this.$refs.picture
        let pictureRatio = picture.naturalWidth / picture.naturalHeight
        let windowRatio = window.innerWidth / window.innerHeight
        if (pictureRatio >= windowRatio) {
          let width = this.maxWidthComputed
          result.width = parseInt(width)
          result.height = parseInt(width / pictureRatio)
        } else {
          let height = this.maxHeightComputed
          result.height = parseInt(height)
          result.width = parseInt(height * pictureRatio)
        }
        result.top = (window.innerHeight - parseInt(result.height)) / 2
        result.left = (window.innerWidth - parseInt(result.width)) / 2
        this.pictureSize = result
      },
      // 设置开始和结束时的状态（也就是挂载指令的元素的size信息）
      setPictureBegin () {
        let rect = this.sourceDom.getBoundingClientRect()
        let {width, height, top, left} = rect
        this.pictureSize = {width: width, height: height, top: top, left: left}
      }
    },
    computed: {
      bgStyle () {
        let backgroundStyle = typeof this.background === 'string' ? {
          backgroundColor: this.background
        } : {
          backgroundColor: defaultBackgroundColor,
          ...this.background
        }
        backgroundStyle.transition = this.handleTransition(this.animate)
        return {opacity: this.isShow ? '1' : '0', ...backgroundStyle}
      },
      maxWidthComputed () {
        const windowWidth = window.innerWidth
        let result = ''
        switch (typeof this.maxWidth) {
          case 'number': result = this.maxWidth; break
          case 'string': result = (/\d+%$/).test(this.maxWidth) ? parseFloat(this.maxWidth) / 100 * windowWidth : parseFloat(this.maxWidth); break
          default: result = windowWidth * percent
        }
        if (typeof this.previewSize !== 'undefined') {
          result = Math.min(result, this.previewSize * this.pictureSize.width)
        }
        return result
      },
      maxHeightComputed () {
        const windowHeight = window.innerHeight
        let result = ''
        switch (typeof this.maxHeight) {
          case 'number': result = this.maxHeight; break
          case 'string': result = (/\d+%$/).test(this.maxHeight) ? parseFloat(this.maxHeight) / 100 * windowHeight : parseFloat(this.maxHeight); break
          default: result = windowHeight * percent
        }
        if (typeof this.previewSize !== 'undefined') {
          result = Math.min(result, this.previewSize * this.pictureSize.height)
        }
        return result
      }
    },
    watch: {
      pictureSize: {
        deep: true,
        handler (val) {
          ['top', 'left', 'width', 'height'].forEach(key => {
            this.$set(this.imgStyle, key, val[key] + 'px')
          })
          this.$set(this.imgStyle, 'transition', this.handleTransition(this.animate))
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
