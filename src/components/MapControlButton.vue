<template>
  <v-btn
		large
    @click="toggleMapEditMode"
    :class="className"
  >
  {{btnText}}
  </v-btn>
</template>

<script>
import { not, equals, and } from 'ramda'

export default {
  name: "MapControlButton",
  props: {
    text: {
    	type: String
		},
    className: {
			type: String
		},
    type: {
			type: String
		}
  },
  data: () => ({
    btnText: '',
		editMode: false
  }),
  methods: {
  	toggleButtonEditMode () {
			this.editMode = not(this.editMode)
			this.btnText = this.editMode ? 'Cancel' : this.text
		},
		restoreButtonEditMode () {
			this.editMode = false
			this.btnText = this.text
		},
		toggleMapEditMode () {
      this.toggleButtonEditMode()
			const mapEditMode = this.editMode ? this.type : false
      this.$bus.$emit('mapEditMode', mapEditMode)
    }
  },
  mounted () {
    this.btnText = this.text
    this.$bus.$on('resetControlBtnText', this.restoreButtonEditMode)
		this.$bus.$on('mapEditMode', mapEditMode => {
			const notCurrentButtonMode = not(equals(mapEditMode, this.type))
			const mapEnterOtherMode = and(this.editMode, notCurrentButtonMode)
			if (mapEnterOtherMode) this.toggleButtonEditMode()
		})
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
  right 500px
  margin 8px
  width 400px
  font-weight 600

.control-found
  border-radius 4px
  position absolute
  z-index 1
  top 0
  right 50px
  margin 8px
  width 400px
  font-weight 600
</style>

