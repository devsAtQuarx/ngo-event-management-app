<template>
  <div>
    <v-form >

    <v-layout row wrap justify-space-around>
      Umang Foundation - Membership Form
      Thanks for your interest in Umang Foundation!!!
      To know more about Umang Foundation, please visit www.umangfoundation.org

      Please provide us below details as part of Membership Process :-
    </v-layout>

      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10 >
          <v-text-field
            label="Full Name"
            v-model="membershipFormData.fullName"
          ></v-text-field>
          <span v-if="membershipFormData.fullName.length == 0" class="text-field-required-warning">
            You have not entered your Full Name ! (First Name - Middle Name - Last Name)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10 >
          <v-select
             v-bind:items="gender"
             v-model="membershipFormData.gender"
             label="Gender"
             single-line
             bottom
           ></v-select>
          <span v-if="membershipFormData.gender.length == 0" class="text-field-required-warning">
            You have not selected your gender !
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10 >
          <v-text-field
            label="Organisation Name"
            v-model="membershipFormData.orgName"
          ></v-text-field>
          <span v-if="membershipFormData.orgName.length == 0" class="text-field-required-warning">
            You have not entered your organisation name ! (Where do you work/study)
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10 >
          <v-select
             v-bind:items="profession"
             v-model="membershipFormData.profession"
             label="Profession"
             single-line
             bottom
           ></v-select>
          <span v-if="membershipFormData.profession.length == 0" class="text-field-required-warning">
            You have not selected your Profession !
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>


      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10 >
          <v-text-field
            v-model="membershipFormData.profileDesc"
            label="Your Profile"
            textarea
          ></v-text-field>
          <span v-if="membershipFormData.profileDesc.length == 0" class="text-field-required-warning">
            Say something about you ! (Max 500 words)
          </span>
          <span v-else-if="membershipFormData.profileDesc.length > 500" class="text-field-required-warning">
            You can't enter More than 500 words !
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10 >
          <v-dialog
            persistent
            v-model="modal"
            lazy
            full-width
          >
            <v-text-field
              slot="activator"
              label="Picker in dialog"
              v-model="membershipFormData.dob"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="membershipFormData.dob" scrollable >
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-dialog>
          <span v-if="membershipFormData.dob.length == 0" class="text-field-required-warning">
            You have not selected your Date of Birth !
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-space-around>
        <v-flex xs12 md10 lg10 >
          <br>
          <h5 class="bloodGroupText">Blood Group</h5>
          <p class="bloodReqMsg">You will be called in case of blood requirement</p>
          <v-radio-group v-model="membershipFormData.bloodGroup" column>
            <v-radio label="A+" value="A+" ></v-radio>
            <v-radio label="A-" value="A-"></v-radio>
            <v-radio label="B+" value="B+" ></v-radio>
            <v-radio label="B-" value="B-"></v-radio>
            <v-radio label="AB+" value="AB+" ></v-radio>
            <v-radio label="AB-" value="AB-"></v-radio>
            <v-radio label="O+" value="O+" ></v-radio>
            <v-radio label="O-" value="O-"></v-radio>
            <v-radio label="Bombay Blood Group" value="Bombay Blood Group" ></v-radio>
            <v-radio label="Dont Know" value="Dont Know"></v-radio>
            <v-radio label="Not Listed above" value="Not Listed above" ></v-radio>
          </v-radio-group>
          <span v-if="membershipFormData.bloodGroup == null" class="text-field-required-warning">
            You have not selected your blood group !
          </span>
          <span class="junk">j</span>
        </v-flex>
      </v-layout>

      <v-btn @click="goToPage2">Next</v-btn>

    </v-form>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default{

  //data
  data(){
    return {
       gender: [
          { text: 'Male' },
          { text: 'Female' },
          { text: 'Other' }
        ],
        profession: [
           { text: 'Business' },
           { text: 'Self-employed' },
           { text: 'Service' },
           {text:'Retired'},
           {text:'Housewife'},
           {text:'Student'},
           {text:'Other'}
         ],

         //dob picker
         menu: false,
         modal: false,
    }
  },

  //methods
  methods:{
    goToPage2(){
      let vm = this
      //console.log(this.$store.state.membershipForm.membershipFormData)
      let membershipFormData = this.$store.state.membershipForm.membershipFormData
      if(membershipFormData.fullName.length != 0 &&
          membershipFormData.gender.length != 0 &&
            membershipFormData.orgName.length != 0 &&
              membershipFormData.profession.length != 0 &&
                membershipFormData.profileDesc.length != 0 &&
                  membershipFormData.profileDesc.length < 500 &&
                    membershipFormData.dob.length != 0 &&
                      membershipFormData.bloodGroup != null){

        //save data to firebase
        this.$store.state.db.db.ref('membershipDetail/'+
          this.$store.state.auth.user.uid)
          .set(this.$store.state.membershipForm.membershipFormData).then(function(snapshot){
              //console.log("saving ...")



              vm.$router.push('/membershipForm/page2')
              //stop preloader

          })

      }else{
        //generate a toast => required fields are not filled
      }
    }
  },

  //computed
  computed : {
    ...mapGetters([
      'membershipFormData'
    ])
  }

}
</script>

<style scoped>
.bloodGroupText{
  color:grey;
}
.bloodReqMsg{
  margin-top: -20px;
  font-size:11px;
  color:grey;
}
</style>
