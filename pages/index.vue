<template>
 <v-container>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="3" sm="2" md="4"></v-col>
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="11" class="pt-10">
          <h2 class="purple--text text-uppercase">{{ title }}</h2>
          <v-divider color="purple" class="mt-2"></v-divider>
          <v-form
            ref="form"
            v-model="valid"
            class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
            lazy-validation
          >
            <v-text-field
              v-model="email"
              append-icon="mdi-email"
              outlined
              color="purple"
              error-count="2"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              outlined
              required
              color="purple"
              :rules="passwordRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
              x-large
              block
              :disabled="!valid"
              color="purple darken-4"
              class="mr-4 text"
              @click="validate"
            >
              <span class="white--text">Login</span>
              <v-icon light>mdi-cached</v-icon>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="3" sm="2" md="4"></v-col>
    </v-row>
  </v-container>
      </v-container>
</template>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: 'Login',
    valid: true,
    show1: false,
    show2: false,
    email: 'appiahbaahjake@outlook.com',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: 'Openme84',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 8) || 'Password must be less than 8 characters',
    ],
  }),

  methods: {
    validate() {
      this.onLogin()
      // if (this.refs.form.validate()) {
      //   this.onLogin()
      // }
    },

    onLogin() {
      this.$strapi
      .login({ identifier: this.email, password: this.password })
      .then(() => {
        this.$store.authenticated = true;
          this.$toast.info('Welcome! '+this.$strapi.user.email);
        this.$router.push("/results")
      }).catch(error =>this.$toast.error(error))

      // this.$auth
      //   .loginWith('local', {
      //     identifier: this.email,
      //     password: this.password,
      //   })
        // .then((response) => {
        //   this.$toast.info('Welcome!!!!' + response.user.email)
        //   this.$router.push('/balloting')
        // })
        // .catch((error) => {
        //   this.$toast.error(error)
        // })
    },
  },
}
</script>

<style scoped>
</style>
