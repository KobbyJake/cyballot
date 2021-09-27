
export const state = () => ({
 election: {},
 logo: '~/assets/img/logo.png',
  voter: {},
  title: "Cyballot Voting System"
});

export const mutations = {
  
  SET_ELECTION: (state, election) => {
    state.election = election;
  },
  
  SET_LOGO: (state, logo) => {
    state.logo = logo;
  },
  
  SET_VOTER: (state, voter) => {
    state.voter = voter;
  },

  RESET_VOTER: (state) => {
    state.voter = { };
  },
  SET_TITLE: (state, title) => {
    state.title = title;
  }
};


export const getters = {
    GET_ELECTION: state => {
      return state.election;
    },
    GET_LOGO: state => {
      return state.logo;
    },
    GET_VOTER: state => {
      return state.voter;
    },
    GET_TITLE: state => {
      return state.title;
    },
  }

  export const actions = {
    
    changeElection(context, payload) {
      context.commit('SET_ELECTION', payload);
    },
    changeLogo(context, payload) {
      context.commit('SET_LOGO', payload);
    },
    changeVoter(context, payload) {
      context.commit('SET_VOTER', payload);
    },
    changeTitle(context, payload) {
      context.commit('SET_TITLE', payload);
    },
    resetVoter(context) {
      context.commit('RESET_VOTER');
    },

  };
