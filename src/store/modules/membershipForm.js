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

    //page3
    referalDetails : '',
    areaOfInterest : '',
    experience : '',
    association : '',

    //page4
    volOpts:{
      event : '',
      skill :'',
      fund : '',
      netRes : '',
      other : '',
      otherTxt :''
    },

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
