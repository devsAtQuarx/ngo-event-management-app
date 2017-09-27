<template>
  <div>

    <p class="grey--text text-xs-center">Your interest areas with Umang Foundation...</p>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 md10 lg10 >
        <br>
        <h6 class="header-text">You are interested in</h6>
        <v-checkbox
          v-bind:label="`Event based volunteering`"
          v-model="membershipFormData.volOpts.event"
          light>
        </v-checkbox>
        <v-checkbox
          v-bind:label="`Skill based volunteering`"
          v-model="membershipFormData.volOpts.skill"
          light>
        </v-checkbox>
        <v-checkbox
          v-bind:label="`Fund Raising for Umang Foundation`"
          v-model="membershipFormData.volOpts.fund"
          light>
        </v-checkbox>
        <v-checkbox
          v-bind:label="`Network and Resource based volunteering`"
          v-model="membershipFormData.volOpts.netRes"
          light>
        </v-checkbox>
        <v-checkbox
          v-bind:label="`Others`"
          v-model="membershipFormData.volOpts.other"
          light>
        </v-checkbox>
        <v-text-field
          v-show = "membershipFormData.volOpts.other == true"
          label="Please Mention"
          v-model="membershipFormData.volOpts.otherTxt"
        ></v-text-field>
        <span
          class="text-field-required-warning"
          v-if="membershipFormData.volOpts.event == false &&
            membershipFormData.volOpts.skill == false &&
              membershipFormData.volOpts.fund == false &&
                membershipFormData.volOpts.netRes == false &&
                  membershipFormData.volOpts.other == false">
          You have not selected any contact Options !
        </span>
        <span
          class="text-field-required-warning"
          v-if="membershipFormData.volOpts.other == true &&
                    membershipFormData.volOpts.otherTxt.length == 0">
          You have said anything about the other options !
        </span>
        <span class="junk">j</span>
      </v-flex>
    </v-layout>
    <v-btn
      small
       grey
       dark
       right
       bottom
       fixed
       slot="activator"
       @click="goToPage5"
       class="create-button"
       >Next
     </v-btn>



  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default{
    methods:{

      goToPage5(){

        let vm = this
        //console.log(this.$store.state.membershipForm.membershipFormData)
        let membershipFormData = this.$store.state.membershipForm.membershipFormData
        if(membershipFormData.volOpts.event != false ||
            membershipFormData.volOpts.skill != false ||
             membershipFormData.volOpts.fund != false ||
              membershipFormData.volOpts.netRes != false ||
                (membershipFormData.volOpts.other != false &&
                  membershipFormData.volOpts.otherTxt.length != 0 )
        ){

          //2nd last page thing -> save membership No(uid)
          this.$store.state.membershipForm.membershipFormData.membershipNo =
            this.$store.state.auth.user.uid

          //save data to firebase
          this.$store.state.db.db.ref('membershipDetail/'+
            this.$store.state.auth.user.uid)
            .set(this.$store.state.membershipForm.membershipFormData).then(function(snapshot){
            //console.log("saving ...")


            vm.$router.push('/membershipForm/lastPage')
            //stop preloader


          })

        }else{
          //generate a toast => required fields are not filled
        }

      }

    },
    computed:{
      ...mapGetters([
        'membershipFormData'
      ])
    }
  }
</script>
