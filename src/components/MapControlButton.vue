<template>
  <v-btn 
    outline
    @click="enterMapEditMode" 
    :class="className"
  >
  {{btnText}}
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
  data: () => ({
    btnText: ''
  }),
  methods: {
    enterMapEditMode () {
      this.btnText = 'Now choose place'
      this.$bus.$emit('mapEditMode', this.type)
    }
  },
  mounted () {
    this.btnText = this.text
    this.$bus.$on('resetControlBtnText', () => this.btnText = this.text)
  },
  beforeDestroy () {
    this.$bus.$off('resetControlBtnText')
  }
}
</script>

<style lang="stylus">
.control-lost
  border-radius 4px
  position absolute
  z-index 1
  right 300px
  margin 8px
  width 200px
  font-weight 600

.control-found
  border-radius 4px
  position absolute
  z-index 1
  top 0
  right 50px
  margin 8px
  width 200px
  font-weight 600
</style>

