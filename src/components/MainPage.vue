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
            <router-view />
          </v-flex>
        </v-layout>
    </v-content>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { map } from 'ramda'

import MenuTabs from './MenuTabs'

export default {
  name: 'MainPage',
  components: { MenuTabs },
  data: () => ({
    drawer: true,
    drawerRight: true,
    right: null,
    left: null,
    items: [
      { icon: 'format_list_bulleted',
        title: 'All',
        model: false
      },
      { icon: 'library_add',
        title: 'Lost',
        model: false
      },
      { icon: 'library_add',
        title: 'Found',
        model: false
      }
    ]
  }),
  methods: {
    toggleDrawer(){
      this.drawer = !this.drawer
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout, .main__wrapper
  height 100%

</style>
