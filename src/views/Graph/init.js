
import { forceSimulation, forceLink, forceCenter, forceManyBody, forceCollide } from 'd3'

export function initSize() {
  const appMain = document.getElementsByClassName('app-main')[0]
  this.width = appMain.clientWidth - 200
  this.height = appMain.clientHeight
}

export function initNodes(nodes, ships) {
  const simulation = forceSimulation()
    .nodes(nodes)
    .force('link', forceLink(ships).distance(150).id(node => node.index))
    .force('center', forceCenter(this.width / 2, this.height / 2))
    .force('charge', forceManyBody(0.1))
    .force('collision', forceCollide(25))

  // this.simulation = simulation
  // this.nodes = simulation.nodes()

  return simulation
}

export function initNodesMap(nodes) {
  nodes.forEach(node => {
    this.nodesMap[node.uuid] = node
  })
}

export function initPathes(nodes, ships) {
  const pathes = []
  ships.forEach(ship => {
    const source = nodes.find(n => n.uuid === ship.source)
    const target = nodes.find(n => n.uuid === ship.target)

    const path = {
      uuid: ship.uuid,
      source: source,
      target: target
    }
    if (!source || !target) {
      return
    }
    pathes.push(path)
  })

  this.pathes = pathes

  return
}

export function initShips(ships) {
  this.ships = ships
}
