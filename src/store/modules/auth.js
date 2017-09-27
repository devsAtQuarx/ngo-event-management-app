const state = {
  user : {},
  token : ''
}

const getters = {
  user : state => {
    return state.user
  },
  token : state => {
    return state.token
  }
}

export default {
  state,
  getters
}
