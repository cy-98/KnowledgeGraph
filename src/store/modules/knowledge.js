
const UPDATENODES = 'updateNodes'

const UPDATESHIPS = 'updateShips'

const UPDATEMAP = 'updateMap'

const state = {
  nodes: [1, 2, 3],
  nodesMap: {},
  ships: []
}

const mutations = {
  [UPDATENODES]: (state, nodes) => (state.nodes = nodes),

  [UPDATESHIPS]: (state, ships) => (state.ships = ships),

  [UPDATEMAP]: (state, map) => (state.nodesMap = map)
}

const actions = {
  [UPDATENODES]: ({ commit }, nodes) => {
    return new Promise((resolve, reject) => {
      commit(UPDATENODES, nodes)
      resolve()
    })
  },

  [UPDATESHIPS]: ({ commit }, ships) => {
    return new Promise((resolve, reject) => {
      commit(UPDATESHIPS, ships)
    })
  },

  [UPDATEMAP]: ({ commit }, map) => {
    return Promise((resolve, reject) => {
      commit(UPDATEMAP, map)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
