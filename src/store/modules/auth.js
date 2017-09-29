const state = {
  user : {},
  token : '',
  drawer:true,
  pushNotText:'',
  snackState:false
}

const getters = {
  user : state => {
    return state.user
  },
  token : state => {
    return state.token
  },
  drawer : state => {
    return state.drawer
  },
  pushNotText : state => {
    return state.pushNotText
  },
  snackState : state => {
    return state.snackState
  }
}

export default {
  state,
  getters
}
