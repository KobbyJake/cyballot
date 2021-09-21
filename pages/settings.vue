<template>
  <v-container class="">
    <v-row class="text-center animate__animated animate__backInDown">
      <v-col cols="3" sm="2" md="3"></v-col>
      <v-col cols="12" sm="4" md="6">
        <v-card elevation="11" class="pt-10" max-width="100%">
          <h3 class="purple--text text-uppercase">Event Settings</h3>
          <v-divider color="purple" class="mt-2"></v-divider>
          <v-card-text>
            <form>
              <v-select
                key="institution.id"
                v-model="institution"
                :items="institutions"
                label="Institution"
                filled
                item-text="name"
                item-value="name"
                return-object
              ></v-select>
              <v-select
                key="election.id"
                v-model="election"
                :items="elections"
                label="Election"
                filled
                item-text="name"
                item-value="name"
                return-object
              ></v-select>
            </form>
          </v-card-text>
          <v-card-actions v-if="ready">
            <v-btn outlined color="purple" @click="vote">
              Setup Voting
            </v-btn>
            <v-spacer />
            <v-btn outlined color="purple" @click="count">
              Setup Counting 
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3" sm="2" md="4"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      specs: {},
      institutions: [],
      institution: {},
      elections: [],
      election: {},
      positions: [],
      candidates: {},
    }
  },
 computed: {
    ready() {
      if(this.institution.id && this.election.id){
        return true
      }
      return false 
    }
  },
  watch: {
    institution(newValue, oldValue) {
      this.$strapi
        .find('elections', { institution: newValue.id })
        .then((res) => {
          this.elections = res
        })
        .catch((error) => {
          this.$toast.error(error)
        })
    },
    election(newValue, oldValue) {
      this.$strapi
        .find('positions', { election: newValue.id })
        .then((res) => {
          this.positions = res
        })
        .catch((error) => {
          this.$toast.error(error)
        })
    },
  },
 
  mounted() {
    this.$strapi
      .find('institutions')
      .then((res) => {
        // this.$toast.info(res.data);
        this.institutions = res
      })
      .catch((error) => {
        this.$toast.error(error)
      })
  },
  methods: {
    vote(){
      this.setUp()
      this.$router.push('/login')
    },
    count(){
      this.setUp()
      this.$router.push('/counter')
    },
    setUp() {
      this.$toast.info('Setup Started')
      this.positions.forEach((position) => {
        this.$strapi
          .find('candidates', { position: position.id })
          .then((res) => {
            if (res.length >= 1) {
              this.candidates[position.name] = res
            }
          })
      })
      this.specs.institution = this.institution
      this.specs.election = this.election
      this.specs.positions = this.positions
      this.specs.candidates = this.candidates
      this.$store.commit('SET_ELECTION', this.specs)
      this.$store.commit('SET_TITLE', this.institution.name)
      if (this.specs.institution.logo) {
        let logoUrl = ''
        if (this.specs.institution.logo.formats.thumbnail.url.startsWith('/')) {
          logoUrl = `http://localhost:1337${this.specs.institution.logo.formats.thumbnail.url}`
        } else {
          logoUrl = this.specs.institution.logo.formats.thumbnail.url
        }
        this.$store.commit('SET_LOGO', logoUrl)
      }
      
    },
  },
}
</script>

<style lang="scss" scoped></style>
