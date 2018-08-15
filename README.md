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
  // loading (not supported)
  loading: {
    image: ''
  },
  // cursor(css)
  cursor: 'pointer',
  clickMethod: 'doubleClick'   // click or doubleClick(not supported)
})

# use this directive
<img v-image-preview src="some-pic-url"/>
or 
<img v-image-preview="some-pic-url or another-pic-url" src="some-pic-url"/>
or
<img v-image-preview="{src: 'some-pic-url or another-pic-url'}" src="some-pic-url"/>
```

## Github
[github](https://github.com/wszxdhr/vue-directive-image-previewer.git)   Why not Star? Why? Come on!

> Welcome to give me some advise or help me to make the code stronger, thanks!

## Demo

http://demo.image-previewer.anymelon.com

## Api    (updated at 2018-08-14)

### options(in Vue.use())(Global Settings)

| API                          | TYPE          | EXAMPLE                                  | DEFAULT           | DESCRIBE                                 |
| ---------------------------- | ------------- | ---------------------------------------- | ----------------- | ---------------------------------------- |
| background                   | String / JSON | "#000000" or "rgba(0, 0, 0, 0.5)" or {backgroundColor: "#000000"} | {backgroundColor:"#000000"} | Background css of wrapper                |
| animate     | JSON           | {duration: 500, delay: 300, func: "linear"} | {duration: 500}   | Transition css of image(field "duration" must be Number) |
| loading（not support yet）     | JSON        | {pictureUrl: "http://somePicUrl"}        | undefined         | Settings of image when it is loading     |
| cursor      | String         | (whatever of css cursor)   | "pointer"                   | Cursor css of image which has directive "v-image-preview" |
| clickMethod（not support yet)| String        | "click" / "doubleClick"                  | "click"           | Method of opening image, **not for closing** |
| copy                         | Boolean       | true / false                             | true              | if copy === true, when previewer is showing, the original picture will not disappear, on the contrary, it will disappear(by setting visibility: hidden;)|
| zIndex                       | Number        | 1000                                     | 1                 | css 'z-index' of outermost wrapper       |
| maxWidth                     | Number || String | 1000  or '1000px' or '100%'           | undefined         | max width of previewer       |
| maxHeight                    | Number || String | 1000  or '1000px' or '100%'           | undefined         | max height of previewer      |
| previewSize                  | Number || String | 2 (previewer.width = image.width * 2, previewer.height = image.height * 2)  or '20%'                   | undefined         | how many times of the previewer with image       |

### options(in directive)(Setting only for Element itself)

| API        | TYPE   | EXAMPLE               | DEFAULT      | DESCRIBE                                 |
| ---------- | ------ | --------------------- | ------------ | ---------------------------------------- |
| ALL        | String | "http://some-pic-url" | src of <img> | This is for only set in a String, like v-image-preview="some-pic-url". |
| background                   | String / JSON | "#000000" or {backgroundColor: "#000000"} | {backgroundColor:"#000000"} | Background css of wrapper                |
| src | String | "http://some-pic-url" | src of <img> | When you want to set another optioins of directive, use this. |
| cursor      | String        | (whatever of css cursor)                 | "pointer"         | Cursor css of image which has directive "v-image-preview" |
| animate     | JSON          | {duration: 500, delay: 300, func: "linear"} | {duration: 500}   | Transition css of image(field "duration" must be Number) |
| copy        | Boolean       | true / false                             | true              | if copy === true, when previewer is showing, the original picture will not disappear, on the contrary, it will disappear(by setting visibility: hidden;)|
| zIndex                       | Number        | 1000                                     | 1                 | css 'z-index' of outermost wrapper       |
| maxWidth                     | Number || String | 1000  or '1000px' or '100%'           | undefined         | max width of previewer       |
| maxHeight                    | Number || String | 1000  or '1000px' or '100%'           | undefined         | max height of previewer      |
| previewSize                  | Number || String | 2 (previewer.width = image.width * 2, previewer.height = image.height * 2)  or '20%'                   | undefined         | how many times of the previewer with image       |

## ChangeLog

### 2018-8-14

Add APIs: maxWidth, maxHeight, previewSize
