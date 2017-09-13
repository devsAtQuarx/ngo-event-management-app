const state = {
  membershipFormData : {
    fullName : '',
    gender : '',
    orgName : '',
    profession : '',
    profileDesc : '',
    dob : '',
    bloodGroup : null
  }
}

const getters = {
  membershipFormData : state => {
    return state.membershipFormData
  }
}

export default {
  state,
  getters
}
