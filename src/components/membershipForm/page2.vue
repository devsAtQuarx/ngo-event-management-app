<template>
  <div>
    <h6>Your Contact Detail</h6>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          label="Phone No."
          v-model="membershipFormData.phNo"
        ></v-text-field>
        <span v-if="membershipFormData.phNo.length == 0" class="text-field-required-warning">
          You have not entered your Phone No !
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          label="Alternative Contact No."
          v-model="membershipFormData.alternativePhNo"
        ></v-text-field>
        <span v-if="membershipFormData.alternativePhNo.length == 0" class="text-field-required-warning">
          You have not an alternative Phone No ! (Alternate Cell Number / Office / Home Phone Number)
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          label="Email"
          v-model="membershipFormData.email"
          @keyup = "validateEmail(membershipFormData.email)"
        ></v-text-field>
        <span class="text-field-required-warning">
          <span
            v-if="membershipFormData.email.length == 0">
              You have not entered your email id ! (Primary Contact Email Id, which you frequently monitor)
          </span>
          <span v-else>{{emailErrMsg}}</span>
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          label="Alternative Email"
          v-model="membershipFormData.alternativeEmail"
          @keyup = "validateEmail2(membershipFormData.alternativeEmail)"
        ></v-text-field>
        <span class="text-field-optional-warning">
          <span
            v-if="membershipFormData.alternativeEmail.length == 0">
            Alternative Email Id ! (Optional)
          </span>
          <span v-else>{{emailErrMsg2}}</span>
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <br>
        <h6 class="header-text">Would you like to receive regular updates from Umang</h6>
        <v-checkbox
          v-bind:label="`Phone`"
          v-model="membershipFormData.selectContactOption.ph"
          light>
        </v-checkbox>
        <v-checkbox
          v-bind:label="`Sms`"
          v-model="membershipFormData.selectContactOption.sms"
          light>
        </v-checkbox>
        <v-checkbox
          v-bind:label="`Email`"
          v-model="membershipFormData.selectContactOption.email"
          light>
        </v-checkbox>
        <v-checkbox
          v-bind:label="`Push Notification`"
          v-model="membershipFormData.selectContactOption.pushNot"
          light>
        </v-checkbox>
        <span
          class="text-field-required-warning"
          v-if="membershipFormData.selectContactOption.ph == false &&
            membershipFormData.selectContactOption.sms == false &&
              membershipFormData.selectContactOption.email == false &&
                membershipFormData.selectContactOption.pushNot == false">
          You have not selected any contact Options !
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          v-model="membershipFormData.address"
          label="Residence Address"
          textarea
        ></v-text-field>
        <span v-if="membershipFormData.address.length == 0" class="text-field-required-warning">
          Your have not entered Address ! (Complete Residential Address)
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          label="Suburb"
          v-model="membershipFormData.suburb"
        ></v-text-field>
        <span v-if="membershipFormData.suburb.length == 0" class="text-field-optional-warning">
          Example : Mulund (West), Only If you are Mumbai Resident ! (Optional)
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          label="City"
          v-model="membershipFormData.city"
        ></v-text-field>
        <span v-if="membershipFormData.city.length == 0" class="text-field-required-warning">
          You have not entered your city !
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-btn @click="goToPage3">Submit</v-btn>
    <span class="text-field-optional-warning"></span>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default{

  //data
  data(){
    return {
      emailErrMsg : '',
      emailErrMsg2 : ''
    }
  },

  //methods
  methods:{

    validateEmail(email){
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        this.emailErrMsg = "Please enter a valid email id !"
      }else{
        this.emailErrMsg = ''
      }
    },

    validateEmail2(email){
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        this.emailErrMsg2 = "Please enter a valid email id !"
      }else{
        this.emailErrMsg2 = ''
      }
    },

    goToPage3(){
      let vm = this
      //console.log(this.$store.state.membershipForm.membershipFormData)
      let membershipFormData = this.$store.state.membershipForm.membershipFormData
      if(membershipFormData.phNo.length != 0 &&
          membershipFormData.alternativePhNo.length != 0 &&
            membershipFormData.email.length != 0 &&
                this.emailErrMsg == '' &&
                      (membershipFormData.selectContactOption.ph != false ||
                        membershipFormData.selectContactOption.sms != false ||
                          membershipFormData.selectContactOption.email != false ||
                            membershipFormData.selectContactOption.pushNot != false) &&
                              membershipFormData.address.length != 0 &&
                                membershipFormData.city.length != 0 &&
                                  membershipFormData.address.length != 0 &&
                                      membershipFormData.city.length != 0){


        //save data to firebase
        this.$store.state.db.db.ref('membershipDetail/'+
          this.$store.state.auth.user.uid)
          .set(this.$store.state.membershipForm.membershipFormData).then(function(snapshot){
              //console.log("saving ...")


              vm.$router.push('/membershipForm/page3')
              //stop preloader


          })

      }else{
        //generate a toast => required fields are not filled
      }
    }

  },

  //computed
  computed:{
    ...mapGetters([
      'membershipFormData'
    ])
  }

}
</script>

<style>
.header-text{
  color:grey;
}
</style>
