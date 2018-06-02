<template>
  <section id="map">

  </section>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import uuidv4 from 'uuidv4'

export default {
  name: 'Map',
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
          console.log(e.lngLat)
          this.addMarker(e.lngLat)
        }
      })
    },
    addMarker (lngLat) {
      let el = document.createElement('div')
      el.className = 'marker'
      let popup = new mapboxgl.Popup({ offset: 25 })
        .setText('Test')
        console.log(lngLat.lng, lngLat.lat)
      new mapboxgl.Marker(el)
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(this.map)
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
</style>
