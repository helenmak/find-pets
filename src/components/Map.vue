<template>
  <section id="map">

  </section>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  name: 'Map',
  methods: {
  },
  mounted () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWxlbmFtYWsiLCJhIjoiY2poczNpOTFwNTYyNzMwbmdhZzF0bndnOCJ9.DHp-ze62avwVbkt0yIUeZA';
    const map = new mapboxgl.Map({
      container: 'map',
      center: [30.55, 50.4],
      zoom: 9.61,
      style: 'mapbox://styles/mapbox/streets-v10?optimize=true'
    });
  }
}
</script>

<style lang="stylus" scoped>
#map
  display flex
  flex-grow 1
  width 100%
  border red
  height 100%

</style>
