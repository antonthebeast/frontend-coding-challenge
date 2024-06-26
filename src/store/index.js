import { createStore } from 'vuex'
import { getAll } from '@/api/peopleApi.js'

export default createStore({
  state: {
    name: '',
    isLucky: null,
    luckyPeople: [],
    winners: JSON.parse(localStorage.getItem('winnerNames')) || [],
    maxWinners: 10, // per day
    error: null
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
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchLuckyPeople({ commit }) {
      commit('setLuckyPeople', []);
      try {
        const people = await getAll(/*canReturnError*/true);
        commit('setLuckyPeople', people);
        commit('setError', null); // Clear any previous errors
      } catch (error) {
        commit('setError', "Failed to check name. Please try again later.");
      }
    },
    async checkName({ commit, state }) {
      await this.dispatch('fetchLuckyPeople');
      if (state.luckyPeople.length > 0) {
        const isLucky = state.luckyPeople.some(person => person.name.toLowerCase() === state.name.toLowerCase());
        commit('setIsLucky', isLucky);
      }
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