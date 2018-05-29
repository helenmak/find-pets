<template>
  <div class="main__wrapper">
    <v-navigation-drawer
      clipped
      disable-route-watcher
      :mini-variant="!drawer"
      fixed
      value="drawer"
      width="220"
      app
      dark
      class="elevation-10"
    >

      <v-list-tile
        @click.stop="toggleDrawer"
        class="white--text"
      >
        <v-list-tile-action>
          <v-btn flat icon>
            <v-icon>swap_horiz</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content v-if="drawer">
          <v-list-tile-title>Hide sidebar</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list dense>

        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.title"
            v-model="item.model"
          >
            <v-list-tile slot="activator">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="white--text">
                <v-list-tile-title>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="`submenu-item-${child.title}-${i}`"
              :to="child.route"
              exact
              exact-active-class="blue accent-2"
            >
              <v-list-tile-action>
                <v-icon v-if="child.icon">{{child.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="white--text">
                <v-list-tile-title>
                  {{ child.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <v-list-tile v-else
                       :key="item.title"
                       :to="item.route"
                       exact
                       active-class="blue accent-2"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile key="logout" >
          <v-list-tile-action>
            <v-icon>keyboard_return</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Logout
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
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

export default {
  name: 'MainPage',
  data: () => ({
    drawer: true,
    drawerRight: true,
    right: null,
    left: null,
    items: [
      { icon: 'format_list_bulleted',
        title: 'All tabs',
        model: false
      },
      { icon: 'library_add',
        title: 'Add song',
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
