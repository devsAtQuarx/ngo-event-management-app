const state = {
  eventsArr : [],
  count : 0
}

const getters = {
  eventsArr : state => {
    return state.eventsArr
  },
  count : state => {
    return state.count
  }
}

export default {
  state,
  getters
}
