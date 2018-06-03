<template>
  <v-tabs grow dark color="cyan">

    <v-tabs-slider color="yellow" />
    <v-tab href="#all">All</v-tab>
    <v-tab href="#lost">Lost</v-tab>
    <v-tab href="#found">Found</v-tab>

    <v-tab-item
      :id="'all'"
    >
      <v-card flat>
        <v-card-text>All</v-card-text>
      </v-card>
    </v-tab-item>

    <v-tab-item
      :id="'lost'"
    >
      <find-pet-card type="lost"/>
      <!-- <add-pet-card /> -->
    </v-tab-item>
    <v-tab-item
      :id="'found'"
    >
      <find-pet-card type="found"/>
      <!-- <add-pet-card /> -->
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
    toggleAddLostCard(){
      this.addLostCardVisible = !this.addLostCardVisible
    }
  }
}
</script>

