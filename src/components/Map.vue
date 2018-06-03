<template>
  <section id="map">

  </section>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import PopupPetCard from './PopupPetCard'
import CustomMapControl from './CustomMapControl'
import Vue from 'vue'
import { clone } from 'ramda'
import uuidv4 from 'uuidv4'

export default {
  name: 'Map',
  data: () => ({
    map: null,
    editMode: false,
    markers: {}
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
          this.addMarker(e.lngLat, this.editMode)
          this.editMode = false
        }
      })
    },
    addMarker (lngLat, markerType) {
      const popupCard = clone(PopupPetCard)
      const id = uuidv4()
      const popupPetCard = new Vue({
        ...popupCard,
        parent: this,
        propsData: { lngLat, id }
      }).$mount()
      let popup = new mapboxgl.Popup({ closeOnClick: false, closeButton: true })
        .setLngLat([lngLat.lng, lngLat.lat])
        .setDOMContent(popupPetCard.$el)
        .addTo(this.map)

      const markerColor = markerType === 'lost' ? 'red' : ''    
      this.markers[id] = new mapboxgl.Marker({color: markerColor})
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
    this.$bus.$on('removeMarker', (id) => {
      this.markers[id].remove()
    })
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
  height 100%
  width calc(100% - 65px)
  position absolute
  top 0
  left 65px

.mapboxgl-popup 
  max-width: 400px
  font 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif

</style>
