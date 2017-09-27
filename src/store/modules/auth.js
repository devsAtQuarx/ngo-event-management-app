const state = {
  user : {},
  token : '',
  drawer:true
}

const getters = {
  user : state => {
    return state.user
  },
  token : state => {
    return state.token
  },
  drawer : drawer => {
    return state.drawer
  }
}

export default {
  state,
  getters
}
