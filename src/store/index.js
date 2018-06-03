import Vue from 'vue'
import Vuex from 'vuex'

import { lostPets, foundPets } from './initialPets'

Vue.use(Vuex)

export const state = {
  lostPets,
  foundPets
}

export const getters = {
  lostPets: state => state.lostPets,
  foundPets: state => state.foundPets
}

const actions = {
  addLostPet ({commit}, petData) {
    commit("ADD_LOST_PET", petData)
  },
  addFoundPet ({commit}, petData) {
    commit("ADD_FOUND_PET", petData)
  }
}

export const mutations = {
  "ADD_LOST_PET" (state, data) {
    state.lostPets[data.id] = data
  },
  "ADD_FOUND_PET" (state, data) {
    state.foundPets[data.id] = data
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})
