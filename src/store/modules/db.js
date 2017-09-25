const state = {
  db : {},
  storgae : {},
  pushNot : ''
}

const getters = {
  db : state => {
    return state.db
  },
  storage : state => {
    return state.storage
  },
  pushNot: state => {
    return state.pushNot
  }
}

export default {
  state,
  getters
}
