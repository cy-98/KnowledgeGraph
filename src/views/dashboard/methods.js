// import _ from 'lodash'

// drag-begin
export function dragStart(e) {
  const uuid = e.target.dataset.uuid
  const node = this.nodesMap[uuid]
  this.draggingNode = node

  this.originX = e.clientX
  this.originY = e.clientY
}

export function dragging(event) {
  this.deltaX = event.clientX - this.originX
  this.deltaY = event.clientY - this.originY

  this.draggingNode.x = this.draggingNode.x + this.deltaX
  this.draggingNode.y = this.draggingNode.y + this.deltaY

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

// 菜单-begin
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

// function nodeMenu(event, settings) {
//   this.$contextmenu({
//     items: settings,
//     event,
//     customClass: 'class-b',
//     zIndex: 99,
//     minWidth: 200
//   })
//   return false
// }
// // 菜单-end

