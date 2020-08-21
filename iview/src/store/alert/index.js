export default {
  state: {
    alert_detail: ['1']
  },
  getters: {
    alertDetail: state => state.alert_detail,
  },
  mutations: {
    SET_Detail: (state, args) => {
      state.alert_detail = args;
    },
  },
  actions: {

  }
}
