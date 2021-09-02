<template>
      <v-container fluid>
        <v-row class="text-center">
          <v-col cols="3" sm="2" md="4"></v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card elevation="11" class="pt-10">
              <h2 class="purple--text text-uppercase">{{ title }}</h2>
              <v-divider color="purple" class="mt-2"></v-divider>
              <v-form   ref="form"    v-model="valid"
               class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
                lazy-validation
                @submit.prevent="onLogin"

              >
              
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
                  type="submit"
                  block
                  :disabled="!valid"
                  color="purple darken-4"
                  class="mr-4 text"
                  @click="validate"
                >
                  <span class="white--text">Start Voting</span>
                  <v-icon light>mdi-cached</v-icon>
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
          <v-col cols="3" sm="2" md="4"></v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
 
  data: () => ({
    title: "Login",
    valid: true,
    show1: true,
    show2: true,
    email: "example@mail.com",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 4) || "Password must be less than 4 characters"
    ]
  }),

  methods: {
    
    validate() {
      this.refs.form.validate();
    },

    onLogin() {
    //  this.$router.to('/inspire');
    }
  }
};
</script>

<style scoped>
</style>
