# vue-directive-image-previewer

> A Vue.js project for tag img, click img to zoom out to full screen.

## Build Setup

``` bash
# install vue-directive-image-previewer
npm install vue-directive-image-previewer -D

# main.js
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)	
or
Vue.use(VueDirectiveImagePreviewer, {
  background: {     // or : background: '#000'
    color: '#000' // or rgba or rgb     // or image: 'url(xxx)'
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

# use this directive
<img v-image-preview src="some-pic-url"/>
or 
<img v-image-preview="some-pic-url" src="some-pic-url"/>
or
<img v-image-preview="{pictureUrl: 'some-pic-url'}" src="some-pic-url"/>
```

## Github
[github](https://github.com/wszxdhr/vue-directive-image-previewer.git)   Why not Star? Why? Come on!

> Welcome to give me some advise or help me to make the code stronger, thanks!

## Demo

http://demo.anymelon.com/vue-directive-image-previewer

## Api    (updated at 2017-09-15)

### options(in Vue.use())

| API         | TYPE          | EXAMPLE                                  | DEFAULT           | DESCRIBE                                 |
| ----------- | ------------- | ---------------------------------------- | ----------------- | ---------------------------------------- |
| background  | String / JSON | "#000000" or {color: "#000000"} or {image: "url(/someurl)"} | {color:"#000000"} | Background css of wrapper                |
| animate     | JSON          | {duration: 500, delay: 300, func: "linear"} | {duration: 500}   | Transition css of image(typeof field "duration" must be Number) |
| loading     | JSON          | {pictureUrl: "http://somePicUrl"}        | undefined         | Settings of image when it is loading     |
| cursor      | String        | (whatever of css cursor)                 | "pointer"         | Cursor css of image which has directive "v-image-preview" |
| clickMethod | String        | "click" / "doubleClick"                  | "click"           | Method of opening image, **not for closing** |

### options(in directive)

| API        | TYPE   | EXAMPLE               | DEFAULT      | DESCRIBE                                 |
| ---------- | ------ | --------------------- | ------------ | ---------------------------------------- |
| ALL        | String | "http://some-pic-url" | src of <img> | This is for only set in a String, like v-image-preview="some-pic-url". |
| pictureUrl | String | "http://some-pic-url" | src of <img> | When you want to set other optioins of directive, use this. |


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
