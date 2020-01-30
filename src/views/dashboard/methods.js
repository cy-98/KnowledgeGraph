// import _ from 'lodash'

// ------------- drag-begin ------------
export function dragStart(e) {
  const uuid = event.target.dataset.uuid
  const node = this.nodesMap[uuid]
  this.draggingNode = node
  this.originX = e.clientX
  this.originY = e.clientY
}

export function dragging(event) {
  this.deltaX = event.clientX - this.originX
  this.deltaY = event.clientY - this.originY

  this.draggingNode.x = this.draggingNode.x + (this.deltaX / this.scale)
  this.draggingNode.y = this.draggingNode.y + (this.deltaY / this.scale)

  this.originX = event.clientX
  this.originY = event.clientY
}

export function dragOver() {
  this.draggingNode = null
  this.originX = 0
  this.originY = 0
  this.deltaX = 0
  this.deltaY = 0
  this.initNodes(this.nodes, this.ships)
} // drag-over

// ----------------- 菜单-begin ------------------
export function setNodeMenu(event, settings) {
  this.$contextmenu({
    items: settings,
    event,
    customClass: 'class-b',
    zIndex: 99,
    minWidth: 200
  })
  return false
}
// -------------- newlink ---------------------
export function movingLink(e) {
  this.originX = e.offsetX
  this.originY = e.offsetY
}
// -------------- update dependence ------------
export function updateNodesFromMap(map) {
  const stack = []

  for (var n in map) {
    if (n) stack.push(map[n])
  }

  return stack
}

export function updateShips(ships, nodesMap, newship) {
  const stack = []
  if (newship) ships.push(newship)

  ships.forEach(ship => {
    if (!nodesMap[ship.source.uuid] || !nodesMap[ship.target.uuid]) {
      return
    }
    stack.push(ship)
  })

  return stack
}
// ----------- zoom --------
export function _zoom(e) {
  const scale = this.scale
  if (scale < 0.3 && e.deltaY < 0) return
  if (scale > 2 && e.deltaY > 0) return
  this.scale += (e.deltaY * 0.009)
}

// ----------- checkThis -------
export function checkThis() {

}
