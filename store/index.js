
export const state = () => ({
 election: {},
  voter: {}
});

export const mutations = {
  
  SET_ELECTION: (state, election) => {
    state.election = election;
  },
  
  SET_VOTER: (state, voter) => {
    state.voter = voter;
  },

  RESET_VOTER: (state) => {
    state.voter = { };
  }
};


export const getters = {
    GET_ELECTION: state => {
      return state.election;
    },
    GET_VOTER: state => {
      return state.voter;
    },
  }

  export const actions = {
    
    changeElection(context, payload) {
      context.commit('SET_ELECTION', payload);
    },
    changeVoter(context, payload) {
      context.commit('SET_VOTER', payload);
    },
    resetVoter(context) {
      context.commit('RESET_VOTER');
    },

  };
