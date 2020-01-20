
import * as d3 from 'd3'
/**
 * 比例尺scale
 * @export
 * @param {any} data
 * @returns obj width scalex & scaley
 */

export function scaleX(width, length) {
  return d3.scaleLinear().domain([0, length]).range([0, width])
}
export function scaleY(height, length) {
  return d3.scaleLinear().domain([0, length]).range([0, height])
}

/**
 * give the path's d
 * 这里有一个问题 这里生成path的属性接受一个字符串，不会随这结点位置改变而改变
 * 解决办法 用svg的line 两点坐标绑定动态变化结点的位置信息
 * @export
 * @param {any} data
 * @returns
 */
export function lineGenerator(data) {
  return d3.line().x(getX).y(getY)(data)

  function getX(v) {
    if (!v) return undefined
    return v.x
  }
  function getY(v) {
    if (!v) return undefined
    return v.y
  }
}

/**
 * 获取画布的最大尺寸
 * @export
 * @returns width & height
 */
export function getSize() {
  const wrapper = document.getElementsByClassName('app-main')[0]

  const width = wrapper.clientWidth
  const height = wrapper.clientHeight
  return {
    width: width,
    height: height
  }
}

/**
 * 返回一个初始化的simulation
 * @export
 * @param {any} nodes 原始数组
 * @param {any} width 布局宽
 * @param {any} height 高
 * @returns simulation inited
 */
export function getSimulation(nodes, width, height, charge) {
  const simulation = d3.forceSimulation()
  if (charge) simulation.force('charge', d3.forceManyBody(4).strength(2))
  simulation.nodes(nodes)
    .force('link', d3.forceLink().id(d => d.index)) // 建立应用连接的力学模型
    .force('center', d3.forceCenter(width / 2, height / 2)) // 力围绕中心 规定模型整体位置
    .force('collision', d3.forceCollide(25).strength(4))

  return simulation
}
