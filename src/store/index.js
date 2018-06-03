import Vue from 'vue'
import Vuex from 'vuex'
import { omit } from 'ramda'

import { pets } from './initialPets'

Vue.use(Vuex)

export const state = {
  pets
}
localStorage.setItem('pets', JSON.stringify(pets))

export const getters = {
  getPets: state => state.pets
}

const actions = {
  addPet ({commit}, petData) {
    commit("ADD_PET", petData)
  },
  removePet ({commit}, id) {
    commit("REMOVE_PET", id)
  }
}

export const mutations = {
  "ADD_PET" (state, data) {
    state.pets[data.id] = data
    localStorage.setItem('pets', JSON.stringify(state.pets))
  },
  "REMOVE_PET" (state, id) {
    state.pets = omit([id], state.pets)
    localStorage.setItem('pets', JSON.stringify(state.pets))
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})
