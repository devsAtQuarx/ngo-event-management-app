const state = {
  membershipFormData : {
    //page1
    fullName : '',
    gender : '',
    orgName : '',
    profession : '',
    profileDesc : '',
    dob : '',
    bloodGroup : null,

    //page2
    phNo : '',
    alternativePhNo: '',
    email: '',
    alternativeEmail : '',
    selectContactOption : {
      ph : false,
      sms : false ,
      email : false ,
      pushNot : false,
      other : ''
    },
    address : '',
    suburb : '',
    city : '',

    //lastPage
    membershipNo : ''

  },

  membershipNo : ''
}

const getters = {
  membershipFormData : state => {
    return state.membershipFormData
  },
  membershipNo : state => {
    return state.membershipNo
  }
}

export default {
  state,
  getters
}
