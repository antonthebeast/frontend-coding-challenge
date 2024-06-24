import { createStore } from 'vuex'
import { getAll } from '@/api/peopleApi.js'

export default createStore({
  state: {
    name: '',
    isLucky: null,
    luckyPeople: [],
    winners: JSON.parse(localStorage.getItem('winnerNames')) || [],
    maxWinners: 10 // per day
  },
  getters: {
    getName: state => state.name,
    getIsLucky: state => state.isLucky,
    getLuckyPeople: state => state.luckyPeople,
    getWinners: state => state.winners,
    getMaxWinners: state => state.maxWinners,
    isWinner: state => state.winners.includes(state.name)
  },
  mutations: {
    setName(state, name) {
      name = name.replace(/^./, match => match.toUpperCase()); // first letter uppercase
      state.name = name;
    },
    setIsLucky(state, isLucky) {
      state.isLucky = isLucky;
    },
    setLuckyPeople(state, people) {
      state.luckyPeople = people;
    },
    addWinnerName(state, name ) {
      if (state.winners.indexOf(name) == -1) {
        state.winners.push(name);
        localStorage.setItem('winnerNames', JSON.stringify(state.winners))
      }
    },
    clearWinners(state) {
      state.winners = [];
      localStorage.setItem('winnerNames', JSON.stringify(state.winners));
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
      if (state.luckyPeople.length === 0) {
        await this.dispatch('fetchLuckyPeople');
      }
      const isLucky = state.luckyPeople.some(person => person.name.toLowerCase() === state.name.toLowerCase());
      commit('setIsLucky', isLucky);
    },
    async addWinner({ commit, state }) {
      if (state.isLucky && state.winners.length < state.maxWinners) {
        commit('addWinnerName', state.name);
      }
    },
    nextDay({ commit }) {
      commit('clearWinners');
    }
  },
})