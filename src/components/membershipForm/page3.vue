<template>
  <div>
    <p class="grey--text text-xs-center">To know more about you...</p>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          label="Referal Details"
          v-model="membershipFormData.referalDetails"
          textarea
        ></v-text-field>
        <span v-if="membershipFormData.referalDetails.length == 0" class="text-field-required-warning">
          You have not entered Name and Contact Details of the person who refered Umang Membership to you ! (Name - Contact Number - Email Id)
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          label="Area of Interest"
          v-model="membershipFormData.areaOfInterest"
          textarea
        ></v-text-field>
        <span v-if="membershipFormData.areaOfInterest.length == 0" class="text-field-required-warning">
          You have not entered your area of your Interest in Social Service !
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          label="Expereince of Social Service"
          v-model="membershipFormData.experience"
          textarea
        ></v-text-field>
        <span v-if="membershipFormData.experience.length == 0" class="text-field-required-warning">
          You have not entered your Expereince of Social Service (Yes or No, If Yes, Please provide details)
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <v-text-field
          label="Association with NGOs"
          v-model="membershipFormData.association"
          textarea
        ></v-text-field>
        <span v-if="membershipFormData.association.length == 0" class="text-field-required-warning">
          You have not entered your Association with any other Social Group / NGOs (List All)
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>
    <v-footer class="pa-1">

      <div style="width:75%;" class="blue white--text text-xs-center">3/4</div>
</v-footer>

            <v-btn
              small
               grey
               dark
               right
               bottom
               fixed
               slot="activator"
               @click="goToPage4"
               class="create-button"
               >Next
             </v-btn>


  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {

    //methods
    methods:{
      goToPage4(){

        let vm = this
        //console.log(this.$store.state.membershipForm.membershipFormData)
        let membershipFormData = this.$store.state.membershipForm.membershipFormData
        if(membershipFormData.referalDetails.length != 0 &&
            membershipFormData.areaOfInterest.length != 0 &&
              membershipFormData.experience.length != 0 &&
                membershipFormData.association.length != 0
          ){


          //save data to firebase
          this.$store.state.db.db.ref('membershipDetail/'+
            this.$store.state.auth.user.uid)
            .set(this.$store.state.membershipForm.membershipFormData).then(function(snapshot){
            //console.log("saving ...")


            vm.$router.push('/membershipForm/page4')
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
.footer {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 26px;
    transition: .3s cubic-bezier(.25,.8,.5,1);
}
</style>
