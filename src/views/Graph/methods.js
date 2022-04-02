// import _ from 'lodash'

// ------------- drag-begin ------------
export function dragStart(e) {
  console.log(e.target.dataset)
  const uuid = e.target.dataset.uuid
  const node = this.nodesMap[uuid]
  console.log(node, this.nodesMap, uuid)
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
    if (!nodesMap[ship.source.uuid] || !nodesMap[ship.target.uuid]) { return }

    stack.push(ship)
  })

  return stack
}

export function deleteNode(uuid) {
  console.log(this)
  delete this.nodesMap[uuid]
  // updateNodes
  this.nodes = this.updateNodesFromMap(this.nodesMap)
  this.ships = this.updateShips(this.ships, this.nodesMap, false)
  // network end
  this.openTip('删除成功')
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
