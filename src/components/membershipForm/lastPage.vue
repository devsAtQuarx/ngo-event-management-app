<template>
  <div>
  <p class="text-xs-center ">  Your Membership No is </p>
  <br>
    <p class="grey--text text-xs-center" style="font-weight:bolder"> {{showMembershipNo}}</p>



    <v-layout row wrap justify-space-around class="pa-0 grey--text" >
      <v-flex xs12 md5 lg3>
        <div>
          <span class="memdetails_head">Email:-
          </span>

          <span class="memdetails_value">{{detail.email}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">DOB:-
          </span>

          <span class="memdetails_value">{{detail.dob}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>

        <div>
          <span class="memdetails_head">Alternate Email:-
          </span>
          <span class="memdetails_value" v-if="detail.atlernativeEmail==null" >
            Not entered by user
          </span>
          <span class="memdetails_value" >{{detail.atlernativeEmail}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Profession :-
          </span>

          <span class="memdetails_value">{{detail.profession.text}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">City :-
          </span>

          <span class="memdetails_value">{{detail.city}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Full Name :-
          </span>
          <span class="memdetails_value" v-if="detail.fullName==null" >
            Not entered by user
          </span>
          <span class="memdetails_value">{{detail.fullName}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Association :-
          </span>

          <span class="memdetails_value">{{detail.association}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Blood Group :-
          </span>

          <span class="memdetails_value">{{detail.bloodGroup}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <span class="memdetails_head">Area of Interest :-
          </span>

          <span class="memdetails_value">{{detail.areaOfInterest}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        <br>
        <div>
          <div>
          <span class="memdetails_head">Selected Contact Option :-
          </span>
          <span class="memdetails_value"  v-for="(value,key) in detail.selectContactOption"
          v-if="value==true">{{key}}
          </span>
          <v-divider style="width:100%"></v-divider>
        </div>
        </div>
        <br>
      </v-flex>





      <v-flex xs12 lg3 offset-lg2>
        <div>
        <span class="memdetails_head">Ph. :-
        </span>
        <span class="memdetails_value" v-if="detail.phNo==null" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{detail.phNo}}
        </span>
        <v-divider style="width:100%"></v-divider>

      </div>
      <br>
      <div>
        <span class="memdetails_head">Gender :-
        </span>

        <span class="memdetails_value">{{detail.gender.text}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>
      <div>
        <span class="memdetails_head">Alternate Ph. :-
        </span>
        <span class="memdetails_value" v-if="detail.atlernativePhNo==''" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{detail.alternativePhNo}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>
      <div>
        <span class="memdetails_head">Address :-
        </span>
        <span class="memdetails_value" v-if="detail.address==null" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{detail.address}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>


      <div>
        <span class="memdetails_head">Organization :-
        </span>
        <span class="memdetails_value" v-if="detail.orgName==null" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{detail.orgName}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>
      <div>
        <div>
        <span class="memdetails_head">Volunteered for :-
        </span>
        <span class="memdetails_value"  v-for="(value,key) in detail.volOpts"
        v-if="value==true">{{key}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      </div>
      <br>
      <div>
        <span class="memdetails_head">Profile Description :-
        </span>
        <span class="memdetails_value" v-if="detail.profileDesc==null" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{detail.profileDesc}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>
      <br>
      <div>
        <span class="memdetails_head">Suburb :-
        </span>
        <span class="memdetails_value" v-if="detail.suburb==''" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{detail.suburb}}
        </span>

      </div>
      <br>
      <div>
        <span class="memdetails_head">Referal Detail :-
        </span>
        <span class="memdetails_value" v-if="detail.referalDetails==null" >
          Not entered by user
        </span>
        <span class="memdetails_value">{{detail.referalDetails}}
        </span>
        <v-divider style="width:100%"></v-divider>
      </div>


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
       @click="goToHome"
       class="create-button"
       >Home
     </v-btn>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default{

  //data
  data(){
    return {
      showMembershipNo : '',
      detail: {}
    }
  },

  //methods
  methods:{

    getMemNo(){
      let vm = this
      this.$store.state.db.db.ref('membershipDetail/' + this.$store.state.auth.user.uid + "/" +
       "membershipNo/").once('value',function(snapshot){
         //console.log(snapshot.val())
         vm.showMembershipNo = snapshot.val()
        vm.getDetail()
       })
    },

    getDetail(){
      let vm = this
      this.$store.state.db.db.ref('membershipDetail/' + this.$store.state.auth.user.uid)
        .once('value',function(snapshot){
        //console.log(snapshot.val())
        vm.detail = snapshot.val()
      })
    },

    goToHome(){
      this.$router.push('/success')
    }
  },

  //computed
  computed : {
    ...mapGetters([

    ]),
  },

  //beforeMount
  beforeMount(){
    this.getMemNo()
  }

}
</script>

<style scoped>
.memdetails_head{
  font-weight: bolder;
  font-size: 20px
}
.memdetails_value{
  font-weight: 400;
  font-size: 17px;
  margin-left: 6px;
}
</style>
