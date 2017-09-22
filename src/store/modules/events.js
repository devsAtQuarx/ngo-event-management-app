const state = {
  eventsArr : [],
  count : 0,
  myEvents : [],
  myEventCount : 0,
  showLoader:true,
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
  },
  showLoader : state => {
   return state.showLoader
 }
}

export default {
  state,
  getters
}
