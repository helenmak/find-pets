import Vue from 'vue'
import Vuex from 'vuex'

import { pets } from './initialPets'

Vue.use(Vuex)

export const state = {
  pets
}

export const getters = {
  getPets: state => state.pets
}

const actions = {
  addPet ({commit}, petData) {
    commit("ADD_PET", petData)
  }
}

export const mutations = {
  "ADD_PET" (state, data) {
    state.pets[data.id] = data
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})
