<template>
  <v-container fluid>
    <v-row class="text-center animate__animated animate__flipInX">
      <v-col cols="3" sm="2" md="4"></v-col>
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="11" class="pt-10">
          <h3 class="purple--text ">{{ title }}</h3>
          <v-divider color="purple" class="mt-2"></v-divider>
           <img class="crop" height="200px" :src="$store.state.logo" />
          <v-form
            ref="form"
            v-model="valid"
            class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4 "
            lazy-validation
            @keydown.enter.native="validate"
          >
           
            <v-text-field
              v-model="password"
              class="text-h3 text-center"
              :type="show1 ? 'text' : 'password'"
              label="Enter code here"
              outlined
              required
              color="purple"
              height = 60
              :rules="passwordRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
              x-large
              block
              :disabled="!valid"
              
              color="green"
              class="mr-4 text"
              @click="validate"
            >
               <v-icon light>mdi-vote</v-icon>
              <span >Start Voting</span>
              
              
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="3" sm="2" md="4"></v-col>
    </v-row>
  </v-container>
</template>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    
    valid: true,
    show1: true,
    show2: false,
    
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 4) || 'Password must be less than 8 characters',
    ],
  }),
 computed: {
    title() {
      return this.$store.state.election.institution
        ? this.$store.state.election.election.name +
            ', ' +
            this.$store.state.election.institution.name
        : 'Cyballot Voting System'
    },
    // position() {
    //   return this.$store.state.title
    //     ? this.$store.state.title
    //     : 'Cyballot Voting System'
    // },
    // voter() {
    //   return this.$store.state.voter
    //     ? this.$store.state.voter.name
    //     : ''
    // },
  },

  methods: {

    validate() {
      this.onLogin()
      // if (this.refs.form.validate()) {
      //   this.onLogin()
      // }
    },

    onLogin() {
     this.$strapi.count("events", {
       voter: this.password,
       activity: "voted"
     }).then(res => {
       if(res >= 1){
          this.$toast.error('You have already voted. Thank You')
          this.password = ""
       } else {
        //  perform voter auth
         this.$strapi.find('voters', {
            index: this.password,
          })
          .then( res => {
            if(res[0]){
              // this.$store.actions.changeVoter(this.voter)
               this.$store.commit('SET_VOTER', res[0])
                this.$router.push('/balloting')
            } else {
              // wrong credential
              this.password = ""
              this.$toast.error("Incorrect Password")
            }
          }).catch(error =>this.$toast.error(error))

       }
     })
    },
  },
  
}
</script>

<style scoped>
</style>
