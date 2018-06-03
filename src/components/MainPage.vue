<template>
  <div class="main__wrapper">
    <v-navigation-drawer
      clipped
      disable-route-watcher
      :mini-variant="!drawer"
      fixed
      value="drawer"
      width="350"
      light
      permanent
      class="deep-purple lighten-5 elevation-5"
      mini-variant-width="65"
    >

      <v-list-tile
        @click.stop="toggleDrawer"
        class="blue-grey--text text--darken-2"
      >
        <v-list-tile-action>
          <v-btn flat icon>
            <v-icon color="blue-grey">swap_horiz</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content v-if="drawer">
          <v-list-tile-title>Hide sidebar</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <menu-tabs/>
    </v-navigation-drawer>

    <v-content class="layout">
        <v-layout justify-center align-center fill-height>
          <v-flex fill-height>
            <map-control-button text="Add lost pet" className="control-lost" type="lost"/>
            <map-control-button text="Add found pet" className="control-found" type="found"/>
            <router-view />
          </v-flex>
        </v-layout>
    </v-content>

  </div>
</template>

<script>
import MenuTabs from './MenuTabs'
import MapControlButton from './MapControlButton'

export default {
  name: 'MainPage',
  components: { MenuTabs, MapControlButton },
  data: () => ({
    drawer: true,
    drawerRight: true,
    right: null,
    left: null
  }),
  methods: {
    toggleDrawer(){
      this.drawer = !this.drawer
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout
.main__wrapper
  height 100%
  position relative
</style>
