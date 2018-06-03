<template>
  <v-btn 
    outline 
    @click="enterMapEditMode" 
    :class="className"
  >
  {{text}}
  </v-btn>
</template>

<script>
export default {
  name: "MapControlButton",
  props: {
    text: '',
    className: '',
    type: ''
  },
  methods: {
    enterMapEditMode () {
      this.$bus.$emit('mapEditMode', this.type)
    }
  }
}
</script>

<style lang="stylus">
.control-lost
  color black
  background blue
  border-radius 4px
  position absolute
  z-index 1
  right 300px
  margin 8px
  width 200px

.control-found
  color white
  background #000
  border-radius 4px
  position absolute
  z-index 1
  top 0
  right 50px
  margin 8px
  width 200px
</style>

