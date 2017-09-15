# vue-directive-image-previewer-dev

> A Vue.js project for develop and test vue-directive-image-previewer 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Demo
http://demo.anymelon.com/vue-directive-image-previewer

## Api    (updated at 2017-09-15)

### options(in Vue.use())

| API         | TYPE          | EXAMPLE                                  | DEFAULT         | DESCRIBE                                 |
| ----------- | ------------- | ---------------------------------------- | --------------- | ---------------------------------------- |
| background  | String / JSON | "#000000" or {color: "#000000"} or {image: "url(/someurl)"} | "#000000"       | Background css of wrapper                |
| animate     | JSON          | {duration: 500, delay: 300, func: "linear"} | {duration: 500} | Transition css of image(typeof field "duration" must be Number) |
| loading     | JSON          | {pictureUrl: "http://somePicUrl"}        | undefined       | Settings of image when it is loading     |
| cursor      | String        | (whatever of css cursor)                 | "pointer"       | Cursor css of image which has directive "v-image-preview" |
| clickMethod | String        | "click" / "doubleClick"                  | "click"         | Method of opening image, **not for closing** |

### options(in directive)

| API        | TYPE   | EXAMPLE               | DEFAULT      | DESCRIBE                                 |
| ---------- | ------ | --------------------- | ------------ | ---------------------------------------- |
| ALL        | String | "http://some-pic-url" | src of <img> | This is for only set in a String, like v-image-preview="some-pic-url". |
| pictureUrl | String | "http://some-pic-url" | src of <img> | When you want to set other optioins of directive, use this. |


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
