const state = () => ({
  position: {}
})

const mutations = {
  setPosition(state, val){
    state.position = val
  }
}

const actions = {
  setPosition: ({commit},position) => {
    commit('setPosition',position)
  }
}

export default {
  namespace: true,
  state,mutations,actions
}