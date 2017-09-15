const state = {
  eventsArr : [],
  count : 0,
  myEvents : [],
  myEventCount : 0
}

const getters = {
  eventsArr : state => {
    return state.eventsArr
  },
  count : state => {
    return state.count
  },
  myEvents : state =>{
    return state.myEvents
  }
}

export default {
  state,
  getters
}
