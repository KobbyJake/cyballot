<template>
 <v-container class="">
      <v-row class="text-center">
      <v-col v-for="n in 5" :key="n" cols="12" sm="3">
        <v-card elevation="11" class="pt-0 mb-5" max-width="250">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
          </v-img>

           <h2 class="purple--text text-uppercase">{{ title }}</h2>
          <v-divider color="purple" class="mt-2"></v-divider>

          <v-card-actions>
            <v-btn block color="green"  outline> Vote </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
 

 
</template>

<script>
export default {
  data: () => ({
    title: 'Candite  Name',
    valid: true,
    show1: false,
    show2: false,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 8) || 'Password must be less than 8 characters',
    ],
  }),

  methods: {
    validate() {
      this.refs.form.validate()
    },

    onLogin() {
      this.$router.to('/inspire')
    },
  },
}
</script>

<style scoped>
</style>
