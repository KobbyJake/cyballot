<template>
  <v-container fluid fill-height>
    <v-row>
      <v-carousel
        v-model="model"
        fill-height
        :show-arrows="false"
        hide-delimiters
      >
        <v-carousel-item fill-height>
          <v-container fluid class="justify-center">
            <v-card
              class="
                text-center
                animate__animated
                animate__pulse
                animate__infinite
                animate__slower
              "
            >
              <v-btn class="mx-2" fab dark large color="purple" @click="start">
                <v-icon dark> mdi-arrow-right-drop-circle </v-icon>
              </v-btn>
              <h3 class="purple--text text-h2 font-weight-black">
                Declaration of Results
              </h3>
              <h3 class="purple--text">{{ title }}</h3>
              <v-divider color="purple" class="mt-2"></v-divider>
              <p class="text-center text-h1 font-weight-black">
                {{ votesCast }}
              </p>
              <p class="text-center text-h3">votes out of</p>
              <p class="text-center text-h1 font-weight-black">
                {{ totalVoters }}
              </p>
              <v-divider color="purple" class="mt-2"></v-divider>
            </v-card>
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
          <v-container>
            <v-row class="text-center" justify-end fill-height>
              <v-col
                v-for="item in displayed"
                :key="item.id"
                class="animate__animated animate__backInDown"
                cols="12"
                sm="4"
              >
                <v-card elevation="11" class="pt-0 mb-5" max-width="350">
                  <h2 class="black--text text-uppercase">{{ item.name }}</h2>
                  <v-avatar size="100">
                    <img :src="getImage(item)" :alt="item.name" />
                  </v-avatar>

                  <v-divider color="purple" class="mt-2"></v-divider>
                  <p class="text-center text-h3 font-weight-black">
                    {{ item.votes }} out of {{ votesCast }}
                  </p>
                  <span class="text-center text-h5 font-weight-black">
                    Representing {{(item.votes/votesCast * 100).toFixed(2)}}%
                  </span>
                  <v-btn
                    dark
                    large
                    color="purple"
                    @click="setWinner(item.name)"
                  >
                    <v-icon dark> mdi-crown </v-icon>
                  </v-btn>
                  <br />
                  <br />
                </v-card>
              </v-col>
              <v-col cols="12" sm="4">
                <v-card
                  
                  elevation="11"
                  class="pt-0 mb-5"
                  max-width="350"
                >
                  <h2 class="black--text text-uppercase">No Vote</h2>
                  <v-avatar size="100">
                    <img src="/img/miscell.png" />
                  </v-avatar>

                  <v-divider color="purple" class="mt-2"></v-divider>
                  <p class="text-center text-h3 font-weight-black">
                    {{ noVoteCount }} out of {{ votesCast }}
                  </p>
                   <span class="text-center text-h5 font-weight-black">
                    Representing {{(noVoteCount/votesCast * 100).toFixed(2)}}%
                  </span>
                  <v-btn
                    dark
                    large
                    color="purple"
                    @click="setWinner('PENDING')"
                  >
                    <v-icon dark> mdi-crown </v-icon>
                  </v-btn>
                  <br />
                  <br />
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
          <v-container>
            <v-row justify="center">
              <v-dialog
                v-model="dialog"
                fullscreen
                transition="dialog-bottom-transition slower"
              >
                <v-card justify="center">
                  <p
                    class="text-center text-h4 grey lighten-2 font-weight-black"
                  >
                    WINNERS DECLARED
                  </p>

                  <p
                    v-for="item in winners"
                    :key="item.id"
                    class="text-center text-h5 font-weight-black"
                  >
                    {{ item.contest }}: {{ item.winner }}
                  </p>

                  <v-divider></v-divider>
                </v-card>
              </v-dialog>
            </v-row>
          </v-container>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      noVoteCount: 0,
      totalVoters: 0,
      votesCast: 0,
      dialog: false,
      model: 0,
      positions: [],
      candidates: [],
      displayed: [],
      selection: [],
      election: {},
      votes: [],
      winners: [],
      index: 0,
    }
  },

  computed: {
    title() {
      return this.$store.state.election.institution
        ? this.$store.state.election.election.name +
            ', ' +
            this.$store.state.election.institution.name
        : 'Cyballot Voting System'
    },
  },
  mounted() {
    this.election = { ...this.$store.state.election }
    this.$strapi.find('votes').then((res) => {
      this.votes = res
    })
    this.$strapi
      .count('voters')
      .then((res) => {
        this.totalVoters = res
        this.getVotesCast()
      })
      .then(() => {
        this.setBallot()
      })
  },
  methods: {
    setWinner(name) {
      this.winners.push({
        contest: this.positions[this.index].name,
        winner: name,
      })
      this.next()
    },
    start() {
      this.model++
      this.$store.commit('SET_TITLE', this.positions[this.index].name)
    },
    getVoteCount() {
      this.displayed = []
      this.candidates[this.positions[this.index].name].forEach((item) => {
        this.$strapi
          .count('votes', {
            choice: item.name,
            position: this.positions[this.index].name,
          })
          .then((res) => {
            item.votes = res
            this.displayed.push(item)
          })
      })
      this.$strapi
        .count('votes', {
          choice: 'NO VOTE',
          position: this.positions[this.index].name,
        })
        .then((res) => {
          this.noVoteCount = res
        })
    },
    getVotesCast() {
      this.$strapi
        .count('events', {
          election: this.$store.state.election.election.name,
          institution: this.$store.state.election.institution.name,
          activity: 'voted',
        })
        .then((res) => {
          this.votesCast = res
        })
    },
    getImage(item) {
      let url = '/img/miscell.png'
      try {
        url = item.photo.formats.thumbnail.url
        // Check if URL is a local path
        if (url.startsWith('/')) {
          // Prepend Strapi address
          return `http://jakestation:1337${url}`
        }
        // Otherwise return full URL
        return url
      } catch (error) {
        return url
      }
    },
    next() {
      this.index += 1
      if (this.index < this.positions.length) {
        if (this.candidates[this.positions[this.index].name]) {
          this.$store.commit('SET_TITLE', this.positions[this.index].name)
          this.getVoteCount()
          // this.animate__animated = true
        } else {
          this.next()
        }
      } else {
        // show selection summary
        this.model++
        this.dialog = true
      }
    },
    validate() {
      this.refs.form.validate()
    },
    setBallot() {
      this.positions = this.election.positions
      this.candidates = this.election.candidates
      this.getVoteCount()
    },
  },
}
</script>
<style>
/* .wall {
  background: url(~assets/cool-background.png) no-repeat center fixed;
  background-size: cover;
} */
</style>
