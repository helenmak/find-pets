<template>
  <div class="uploaded-image" :style="{backgroundImage: `url(${image}`}" />
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    image: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="stylus" scoped>
.uploaded-image 
  min-width 80px
  width 80px
  height 80px
  border-radius 3px
  background-repeat no-repeat
  background-position center
  background-size cover
  margin-right 10px
</style>
