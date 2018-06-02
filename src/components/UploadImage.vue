<template>
  <div class="up-image">
    <div class="uploaded-image" :style="{backgroundImage: `url(${image || value}`}">
    </div>
    <div class="ch-file-btn" v-if="!image">
      <input 
        type="file" 
        accept="image/*" 
        class="ch-file-btn__input" 
        @change="uploadFile"
      />
      <v-btn size="small" class="ch-file-btn__bnt">{{placeholder}}</v-btn>
    </div>

    <v-btn 
      v-else 
      size="small" 
      class="ch-file-btn__bnt"
      @click="handleFileChange"
    >Remove
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  props: {
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Upload'
    }
  },
  data: () => ({
    image: null,
  }),
  methods: {
    handleFileChange (image = null) {
      this.image = image
      this.$emit('input', image)
    },
    uploadFile (e) {
      const file = (e.target.files || e.dataTransfer.files)[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => this.handleFileChange(reader.result)
    }
  }
}
</script>

<style lang="stylus" scoped>
.up-image 
  position relative
  display flex
  height 80px
  align-items center
  margin-bottom 10px

.ch-file-btn 
  width 150px
  position relative
  overflow hidden

  &__input
  &__btn 
    position absolute
    top 0
    left 0
    bottom 0
    right 0

  &__input 
    opacity 0
    z-index 10
    cursor pointer
    width 100%

  &__btn 
    color red
    z-index 1

.uploaded-image 
  width 80px
  height 80px
  border-radius 3px
  background-repeat no-repeat
  background-position center
  background-size cover
  margin-right 10px
</style>
