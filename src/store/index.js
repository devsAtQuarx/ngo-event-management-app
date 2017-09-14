import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import db from './modules/db'
import events from './modules/events'

import membershipForm from './modules/membershipForm'
import joinedEvent from './modules/joinedEvent'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules:{
    auth,
    db,
    events,

    membershipForm,
    joinedEvent
  }
})
