
const UPDATENODES = 'updateNodes'

const UPDATESHIPS = 'updateShips'

const UPDATEMAP = 'updateMap'

const UPDATECARD = 'updateCard'

const CHANGEMODE = 'changeMode'

const state = {
  nodes: [1, 2, 3],
  nodesMap: {},
  ships: [],
  GraphMode: 'normal',
  card: {
    word: 'word',
    subject: '科目',
    abstract: '简介',
    interLink: '链接'
  }
}

const mutations = {
  [UPDATENODES]: (state, nodes) => (state.nodes = nodes),

  [UPDATESHIPS]: (state, ships) => (state.ships = ships),

  [UPDATEMAP]: (state, map) => (state.nodesMap = map),

  [UPDATECARD]: (state, card) => (state.card = card),

  [CHANGEMODE]: (state, mode) => (state.mode = mode)
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
  },

  [UPDATECARD]: ({ commit }, card) => {
    return new Promise((resolve, reject) => {
      commit(UPDATECARD, card)
    })
  },

  [CHANGEMODE]: ({ commit }, mode) => {
    return new Promise((resolve, reject) => {
      commit(CHANGEMODE, mode)
    })
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions
}
