<template>
  <v-tabs fill-height>
    <v-tab class="text-none">
      <!-- <v-icon left>mdi-account</v-icon> -->
      Introduction
    </v-tab>
    <v-tab class="text-none">
      <!-- <v-icon left>mdi-account</v-icon> -->
      Quiz
    </v-tab>

    <v-tab-item>
      <v-carousel fill-height>
        <v-carousel-item>
          <!-- <br /> -->
          <h1 class="display-2 font-weight-black text-center">
            Learn about COVID-19
          </h1>
          <hr />
          <v-row class="fill-height" align="center" justify="center">
            <!-- <img src="~assets/covidscare.jpg" width="900" /> -->
          </v-row>
        </v-carousel-item>
        <v-carousel-item>
          <h1 class="display-2 font-weight-black text-center">
            What is COVID-19?
          </h1>
          <hr />
          <br />
          <p class="display-1 font-weight-medium">
            COVID-19, otherwise known as coronavirus disease 2019, is a new
            illness caused by a previously unknown virus called SARS-CoV-2. The
            virus is part of a family of coronaviruses which are responsible for
            lots of different illness from the common cold to the flu. But this
            new strain can be more severe in some populations. Discovered in
            December 2019, the virus has since spread around the world and on 11
            March, the World Health Organization (WHO) declared it pandemic.
          </p>
        </v-carousel-item>
        <v-carousel-item>
          <h1 class="display-2 font-weight-black text-center">
            How is COVID-19 spread?
          </h1>
          <hr />
          <br />
          <p class="display-1 font-weight-medium">
            COVID-19 is spread through contact with respiratory droplets of a
            person currently infected with the virus. These droplets come from
            the nose or mouth of an infected person and may land on surfaces and
            objects around them. The virus is then spread when another person
            comes into contact with these droplets and touches their own face,
            nose or mouth. The virus may also be spread when an infected person
            sneezes, coughs or exhales, and people around them breathe in these
            micro-droplets. For this reason, it’s important to stay around one
            meter (3 feet) away from someone you know to have the virus.
          </p>
        </v-carousel-item>
        <v-carousel-item>
          <h1 class="display-2 font-weight-black text-center">
            What are the symptoms of COVID-19?
          </h1>
          <hr />
          <br />
          <p class="display-1 font-weight-medium">
            The most common symptoms are a dry cough, tiredness and a high
            temperature. Other flu-like symptoms such as aches and pains, nasal
            congestion, runny nose, sore throat or diarrhoea are also common.
          </p>
          <p class="display-1 font-weight-medium">
            Around 80% of people with COVID-19 recover from the virus without
            the need for special treatment, usually in around seven days. Many
            may not even know that they have the virus, while others may feel
            like they have the common cold and treat it as they normally would
            at home. Around one in six people will get seriously ill from the
            virus and may have trouble breathing. These people will need
            hospitalisation.
          </p>
        </v-carousel-item>
        <v-carousel-item>
          <v-row class="fill-height" align="center" justify="center">
            <!-- <img src="~assets/signs.JPG" width="900" /> -->
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-tab-item>
    <v-tab-item>
      <v-carousel
        v-model="model"
        fill-height
        :show-arrows="false"
        hide-delimiters
      >
        <v-carousel-item>
          <v-container>
            <v-row>
              <p class="display-2 font-weight-black text-center">
                Test your knowledge on COVID-19
              </p>
            </v-row>
          </v-container>

          <hr />

          <v-container text-center align-center justify-center>
            <v-row>
              <v-btn
                outlined
                rounded
                large
                color="default"
                class="text-none"
                @click="model++"
                ><v-icon left>mdi-marker-check</v-icon>Start work</v-btn
              >
              <v-spacer></v-spacer>
              <p>
                Instruction: Select (click) the correct option
              </p>
            </v-row>
            <v-row align="center" justify="center">
              <!-- <img src="~assets/exams.svg" alt="exam svg" width="400vw" /> -->
            </v-row>
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
         <v-container fluid>
            
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
         <v-container fluid>
            
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
          <v-container fluid>
            
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
          <v-container fluid>
            
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
         <v-container fluid>
            
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
         <v-container fluid>
            
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
         <v-container fluid>
            
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
         <v-container fluid>
            
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
          <v-container fluid>
            
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
         <v-container fluid>
            
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
         <v-container fluid>
            
          </v-container>
        </v-carousel-item>
      </v-carousel>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      model: 0,
      marks: 0
    };
  },
  methods: {
    response() {
      this.$toast.success("Correct Response", {
        iconPack: "mdi",
        icon: "mdi-check",
        theme: "outline"
      });
      this.marks++;
      this.model++;
    },
    conclude() {
      this.$axios.put("/score", {
        id: this.$auth.user.id,
        score: this.marks,
        status: "Educated"
      });
      this.dialog = true;
      // this.model++
    }
  }
};
</script>
<style>
/* .wall {
  background: url(~assets/cool-background.png) no-repeat center fixed;
  background-size: cover;
} */
</style>
