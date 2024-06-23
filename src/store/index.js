import { createStore } from 'vuex'
import { getAll } from '@/api/peopleApi.js'

export default createStore({
  state: {
    name: '',
    isLucky: null,
    luckyPeople: [],
    winners: []
  },
  getters: {
    getName: state => state.name,
    getIsLucky: state => state.isLucky,
    getLuckyPeople: state => state.luckyPeople,
    getWinners: state => state.winners
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
    setIsLucky(state, isLucky) {
      state.isLucky = isLucky;
    },
    setLuckyPeople(state, people) {
      state.luckyPeople = people;
    },
    addWinnerName(state, name) {
      if (state.winners.indexOf(name) == -1) {
        state.winners.push(name);
      }
    }
  },
  actions: {
    async fetchLuckyPeople({ commit }) {
      try {
        const people = await getAll();
        commit('setLuckyPeople', people);
      } catch (error) {
        console.error('Failed to fetch lucky people:', error); // handle this error? perhaps by setting an error state?
      }
    },
    async checkName({ commit, state }) {
      state.name = state.name.replace(/^./, match => match.toUpperCase()); // first letter uppercase
      if (state.luckyPeople.length === 0) {
        await this.dispatch('fetchLuckyPeople');
      }
      const isLucky = state.luckyPeople.some(person => person.name.toLowerCase() === state.name.toLowerCase());
      commit('setIsLucky', isLucky);
    },
    async addWinner({ commit, state }) {
      if (state.isLucky) {
        commit('addWinnerName', state.name);
      }
    }
  },
})