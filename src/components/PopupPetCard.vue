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
      type: [String, Number]
    },
    status: {
      type: String
    },
    petData: {
      type: Object
    }
  },
  data: {
    addMode: true,
    pet: null
  },
  methods: {
    ...mapActions(['addPet']),
    saveNewPet (pet) {
      this.pet = {
        ...pet, 
        id: this.id, 
        lngLat: this.lngLat,
        status: this.status
      }
      this.addPet(this.pet)
      this.addMode = false
    }
  },
  mounted () {
    if(this.petData){
      this.addMode = false
      this.pet = this.petData
    }
  }
}
</script>

