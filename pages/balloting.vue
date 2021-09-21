<template>
  <v-container class="">
    <v-row class="text-center" justify-end>
      <v-col
        v-for="item in displayed"
        :key="item.id"
        class="animate__animated animate__backInDown"
        cols="12"
        sm="4"
      >
        <v-card elevation="11" class="pt-0 mb-5" max-width="350">
          <h2 class="black--text text-uppercase">{{ item.name }}</h2>
          <v-avatar size="200">
            <img :src="getImage(item)" :alt="item.name" />
          </v-avatar>

          <v-divider color="purple" class="mt-2"></v-divider>

          <v-card-actions>
            <v-btn block color="green" outlined @click="choose(item)">
              <v-icon light>mdi-vote</v-icon>
              Vote
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="11" class="pt-0 mb-5" max-width="350">
          <h2 class="black--text text-uppercase">No Vote</h2>
          <v-avatar size="200">
            <img src="/img/miscell.png" />
          </v-avatar>

          <v-divider color="purple" class="mt-2"></v-divider>

          <v-card-actions>
            <v-btn block color="green" outlined @click="choose({})">
              <v-icon light>mdi-vote</v-icon>
              No Vote
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        
        transition="dialog-bottom-transition"
      >
        <v-card justify="center">
          <v-card-title class="text-h5 grey lighten-2 text-center">
            <p class="text-center">
            Summary of Votes by {{ $store.state.voter.name }}
            </p>
          </v-card-title>

          <v-card-text v-for="item in selection" :key="item.id">
            {{ item.position }}: {{ item.choice }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="saveVote()"> 
              <v-icon light>mdi-ballot-outline</v-icon>
              I accept </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    animate__animated: false,
    title: 'Candite  Name',
    positions: [],
    candidates: [],
    displayed: [],
    selection: [],
    election: {},
    voter: {},
    vote: {},
    dialog: false,
    index: 0,
  }),
  mounted() {
    try {
      this.election = { ...this.$store.state.election }
      this.voter = { ...this.$store.state.voter }
      this.setBallot()
    } catch (error) {
      this.$toast.error(error)
    }
  },

  methods: {
    saveVote() {
      // saving votes
      this.selection.forEach((element) => {
        this.$strapi.create('votes', element)
      })

      // change voter status to voted
      this.$strapi.create('events', {
        voter: this.voter.index,
        activity: "voted"
      })
      // this.$strapi.update('voters', this.voter.id, { status: 'voted' })

      // reset variables
      this.dialog = false
      this.$store.commit('SET_VOTER', {})
      this.$store.commit('SET_TITLE', this.election.institution.name)
      this.$router.push('login')
    },
    choose(item) {
      this.vote = {}
      // set selection
      this.vote.votesID = this.voter.id + this.$store.state.title
      this.vote.voter = this.voter.id
      this.vote.election = this.election.election.id
      this.vote.position = this.$store.state.title
      this.vote.choice = item.name ? item.name : 'NO VOTE'
      this.vote.created_by = 1
      this.vote.published_by = 1
      this.vote.created_at = new Date()
      this.vote.updated_at = new Date()
      this.selection.push(this.vote)

      // go to next
      this.next()
    },
    getImage(item) {
      let url = '/img/miscell.png'
      try {
        url = item.photo.formats.thumbnail.url
        // Check if URL is a local path
        if (url.startsWith('/')) {
          // Prepend Strapi address
          return `http://localhost:1337${url}`
        }
        // Otherwise return full URL
        return url
      } catch (error) {
        return url
      }
      // if(!url){
      //    url = "/img/miscell.png"
      //    return url
      // }
      //  return getStrapiMedia(this.$store.state.election.institution.logo.formats.thumbnail.url)
    },
    next() {
      this.index += 1
      if (this.index < this.positions.length) {
        if (this.candidates[this.positions[this.index].name]) {
          this.$store.commit('SET_TITLE', this.positions[this.index].name)
          this.displayed = this.candidates[this.positions[this.index].name]
          // this.animate__animated = true
        } else {
          this.next()
        }
      } else {
        // show selection summary
        this.dialog = true
      }
    },
    validate() {
      this.refs.form.validate()
    },
    setBallot() {
      this.positions = this.election.positions
      this.candidates = this.election.candidates
      this.$store.commit('SET_TITLE', this.positions[this.index].name)
      this.displayed = this.candidates[this.positions[this.index].name]
    },
  },
}
</script>

<style scoped></style>
