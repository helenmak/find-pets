<template>
  <div>
    <add-pet-card 
      v-if="addMode"
      :id="id"
      @savePet = "saveNewPet($event)"
    />
    <pet-card 
      v-else
      v-bind="pet"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PetCard from './PetCard'
import AddPetCard from './AddPetCard'

export default {
  name: "PopupPetCard",
  components: { PetCard, AddPetCard },
  props: {
    lngLat: {
      type: Object
    },
    id: {
      type: String
    }
  },
  data: {
    addMode: true,
    pet: null
  },
  methods: {
    ...mapActions(['addLostPet']),
    saveNewPet (petData) {
      this.pet = {
        ...petData, 
        id: this.id, 
        lngLat: [this.lngLat.lng, this.lngLat.lat]
      }
      this.addLostPet(this.pet)
      this.addMode = false
    }
  }
}
</script>

