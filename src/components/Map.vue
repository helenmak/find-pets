<template>
  <section id="map" />
</template>

<script>
import mapboxgl from 'mapbox-gl'
import PopupPetCard from './PopupPetCard'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { clone, omit, mapObjIndexed, filter, whereEq, keys, findIndex, equals, not, prop } from 'ramda'
import uuidv4 from 'uuidv4'

export default {
  name: 'Map',
  data: () => ({
    map: null,
    editMode: false,
    markers: {},
    measureMode: false
  }),
  computed: {
    ...mapGetters(['getPets'])
  },
  methods: {
    initMap () {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZWxlbmFtYWsiLCJhIjoiY2poczNpOTFwNTYyNzMwbmdhZzF0bndnOCJ9.DHp-ze62avwVbkt0yIUeZA'
      this.map = new mapboxgl.Map({
        container: 'map',
        center: [30.55, 50.4],
        zoom: 9.61,
        style: 'mapbox://styles/mapbox/streets-v10?optimize=true'
      })
      let markerElem = document.createElement('div')
			markerElem.className = 'marker'
      new mapboxgl.Marker(markerElem)
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
          this.$bus.$emit('resetControlBtnText')
        }
      })
    },
    addMarker (lngLat, markerType, petData) {
      const popupCard = clone(PopupPetCard)
      const id = prop('id', petData) || uuidv4()
      const popupPetCard = new Vue({
        ...popupCard,
        parent: this,
        propsData: { lngLat, id, status: markerType, petData }
      }).$mount()
      let popup = new mapboxgl.Popup({ closeOnClick: false, closeButton: true })
        .setLngLat([lngLat.lng, lngLat.lat])
        .setDOMContent(popupPetCard.$el)
        .addTo(this.map)

      const markerColor = markerType === 'lost' ? 'red' : ''    
      this.markers[id] = {
        marker: new mapboxgl.Marker({color: markerColor}),
        type: markerType,
        onMap: true
      }
      this.markers[id].marker
        .setLngLat([lngLat.lng, lngLat.lat])
        .setPopup(popup)
        .addTo(this.map)
      if(!petData) this.markers[id].marker.togglePopup()
    },
    renderPets (pets) {
      const renderData = petData => {
        const lngLat = petData.lngLat
        const markerType = petData.status
        this.addMarker(lngLat, markerType, petData)
      }
      mapObjIndexed(renderData, pets)
    },
    filterPets (pets, searchQuery) {
      const filterObj = item => whereEq(searchQuery, item)
      const petsToRender = filter(filterObj, pets)
      const idsToRender = keys(petsToRender)   
      for(let markerId in this.markers){
        if(equals(findIndex(petId => equals(petId, markerId), idsToRender), -1)){
          if(this.markers[markerId].onMap) {
            this.markers[markerId].marker.remove()
            this.markers[markerId].onMap = false
          }
        } else {
          if(not(this.markers[markerId].onMap)) {
            this.markers[markerId].marker.addTo(this.map)
            this.markers[markerId].onMap = true
          }
        }
      }
    }
  },
  mounted () {
    this.$bus.$on('mapEditMode', mode => this.editMode = mode)
    this.initMap()
    this.addControls()
    this.handleMapEvents()
    this.$bus.$on('removeMarker', (id) => {
      this.markers[id].marker.remove()
      this.markers = omit([id], this.markers)
    })
    if(this.getPets) this.renderPets(this.getPets)
    this.$bus.$on('searchPets', searchQuery => {
      if(this.getPets) this.filterPets(this.getPets, searchQuery)
    })
  },
  beforeDestroy () {
    this.$bus.$off('mapEditMode')
    this.$bus.$off('removeMarker')
    this.$bus.$off('searchPets')
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
  max-width: 500px
  font 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif
</style>
