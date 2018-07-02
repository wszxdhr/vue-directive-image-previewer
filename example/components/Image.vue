<template>
  <img :src="src + myClass" alt=""/>
</template>

<script>
  export default {
    props: {
      src: {}
    },
    data: () => ({
      myClass: ''
    }),
    mounted () {}
  }
</script>