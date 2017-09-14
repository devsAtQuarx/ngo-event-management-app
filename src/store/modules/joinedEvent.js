const state = {
  joinedEvent : []
}

const getters = {
  joinedEvent : state => {
    return state.joinedEvent
  }
}

export default {
  state,
  getters
}
