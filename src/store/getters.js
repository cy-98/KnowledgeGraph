const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  // knowledge
  nodes: state => state.knowledge.nodes,
  ships: state => state.knowledge.ships
}
export default getters
