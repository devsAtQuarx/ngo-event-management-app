const state = {
  user : {},
  drawer:true
}

const getters = {
  user : state => {
    return state.user
  },
  drawer : drawer => {
    return state.drawer
  },

}

export default {
  state,
  getters
}
