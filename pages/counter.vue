<template>
  <v-container fluid>
    <v-row class="text-center animate__animated animate__pulse animate__infinite animate__slower">
      <v-col cols="3" sm="2" md="3"></v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="11" class="pt-10 pb-10">
          <h3 class="purple--text text-h2 font-weight-black">Voter Count</h3>
          <h3 class="purple--text ">{{ title }}</h3>
          <v-divider color="purple" class="mt-2"></v-divider>
          <p class="text-center text-h1 font-weight-black">{{votesCast}}  </p>
          <p class="text-center text-h3 ">votes out of </p>
          <p class="text-center text-h1 font-weight-black">{{totalVoters}} </p>
          <v-divider color="purple" class="mt-2"></v-divider>
          <br>
          <br>
        </v-card>
      </v-col>
      <v-col cols="3" sm="2" md="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    totalVoters: 0,
    votesCast: 0
   
  }),
 computed: {
   title() {
     return this.$store.state.election.institution
        ? this.$store.state.election.election.name +
            ', ' +
            this.$store.state.election.institution.name
        : 'Cyballot Voting System'
    },
  
  },
  mounted () {
    this.$strapi.count("voters").then(res =>{
      this.totalVoters = res
    })
    setInterval(this.getVotesCast, 3000);
  },

  methods: {
    getVotesCast(){
      this.$strapi.count("events", {
        activity: "voted"
      }).then(res =>{
        this.votesCast = res
      })
    },
  },
  
}
</script>

<style scoped>
</style>
