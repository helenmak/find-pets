<template>
  <v-tabs grow dark color="cyan">

    <v-tabs-slider color="yellow" />
    <v-tab href="#all">All</v-tab>
    <v-tab href="#lost">Lost</v-tab>
    <v-tab href="#found">Found</v-tab>

    <v-tab-item :id="'all'">
      <find-pet-card/>
      <v-btn @click="toggleMapMeasureMode">Find by radius</v-btn>
      <v-text-field 
        v-model="radius"
        label="Radius"
      />
    </v-tab-item>

    <v-tab-item :id="'lost'">
      <find-pet-card type="lost"/>
    </v-tab-item>

    <v-tab-item :id="'found'">
      <find-pet-card type="found"/>
    </v-tab-item>

  </v-tabs>
</template>

<script>
import AddPetCard from './AddPetCard'
import FindPetCard from './FindPetCard'

export default {
  name: 'MenuTabs',
  components: { AddPetCard, FindPetCard },
  data: () => ({
    addLostCardVisible: false
  }),
  methods: {
    toggleMapMeasureMode () {
      this.$bus.$emit('mapMeasureMode', { mode: true, radius })
    }
  }
}
</script>

