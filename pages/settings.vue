<template>
  <v-container class="">
    <v-row class="text-center">
      <v-col cols="3" sm="2" md="3"></v-col>
      <v-col cols="12" sm="4" md="6">
        <v-card class="" elevation="16" max-width="100%">
          <v-card-text>
            <div class="text--primary">Event specifications</div>
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
          <v-card-actions>
            <v-btn outline color="green" @click="setUp"> Save Settings </v-btn>
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
      this.$store.commit("SET_ELECTION", this.specs);
      this.$router.push("/voterLogin")
      // this.$store.changeElection(this.specs)
    },
  },
}
</script>

<style lang="scss" scoped></style>
