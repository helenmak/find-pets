<template>
  <section id="map">

  </section>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import MapMarker from './MapMarker'
import AddLostCard from './AddLostCard'
import Vue from 'vue'

export default {
  name: 'Map',
  components: { MapMarker },
  data: () => ({
    map: null,
    editMode: true
  }),
  methods: {
    initMap () {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZWxlbmFtYWsiLCJhIjoiY2poczNpOTFwNTYyNzMwbmdhZzF0bndnOCJ9.DHp-ze62avwVbkt0yIUeZA'
      this.map = new mapboxgl.Map({
        container: 'map',
        center: [30.55, 50.4],
        zoom: 9.61,
        style: 'mapbox://styles/mapbox/streets-v10?optimize=true'
      })
      let el = document.createElement('div')
      el.className = 'marker'
      new mapboxgl.Marker(el)
        .setLngLat([30.58071739532045, 50.4471283915895])
        .addTo(this.map)
    },
    addControls () {
      this.map.addControl(new mapboxgl.NavigationControl())
    },
    handleMapEvents () {
      this.map.on('click', (e) => {
        if(this.editMode) {
          this.addMarker(e.lngLat)
          this.editMode = false
        }
      })
    },
    async addMarker (lngLat) {
      let el = document.createElement('div')
      el.className = 'marker'

      var addPetCard = new Vue({
        ...AddLostCard,
        parent: this,
        propsData: { /* pass props here*/ }
      }).$mount()
      addPetCard.$on('someEvent', (value) => {
        // listen to events emitted from the component
      })
      let popup = new mapboxgl.Popup({ closeOnClick: false, closeButton: true })
        .setLngLat([lngLat.lng, lngLat.lat])
        .setDOMContent(addPetCard.$el)
        .addTo(this.map)
      
        new mapboxgl.Marker(el)
        .setLngLat([lngLat.lng, lngLat.lat])
        .setPopup(popup)
        .addTo(this.map)
        .togglePopup()
      
    }
  },
  mounted () {
    this.$bus.$on('mapEditMode', mode => this.editMode = mode)
    this.initMap()
    this.addControls()
    this.handleMapEvents()
  },
  beforeDestroy () {
    this.$bus.$off('mapEditMode')
  }
}
</script>

<style lang="stylus">
#map
  display flex
  flex-grow 1
  width 100%
  border red
  height 100%
  position absolute
  top 0
  bottom 0

.marker 
  background-image url('./marker.svg')
  background-size cover
  width 30px
  height 30px
  border-radius 50%
  cursor pointer

.mapboxgl-popup 
  max-width: 400px
  font 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif
</style>
