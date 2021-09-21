<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <h2 class="purple--text text-uppercase">{{position}}</h2>
      <!-- <v-toolbar-title class="animate__animated animate__pulse animate__infinite" v-text="position" /> -->
      <v-spacer />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span v-show="voter">{{"Voter: "+ voter}}</span>
      <span>{{ title }}</span>
      <v-spacer />
      <span>CYBALLOT Voting System - 0242525727 &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      eventPostion: '',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
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
    position() {
      return this.$store.state.title
        ? this.$store.state.title
        : 'Cyballot Voting System'
    },
    voter() {
      return this.$store.state.voter
        ? this.$store.state.voter.name
        : ''
    },
  },
}
</script>
