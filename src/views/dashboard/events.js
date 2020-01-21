import node from "@babel/register/lib/node"

// import http from '../api/http'

export const updateNodes = () => {

}

export const updateShips = () => {

}

export const updatePathes = (ships, nodes) => {
    const pathes = []
    let i = 0
    ships.forEach(ship => {

        const IDsource = ship.source
        const IDtarget = ship.target
        
        const source = nodes.find(n => (n.uuid === IDsource))
        const target = nodes.find(n => (n.uuid === IDtarget))
        if (!source || !target) { return }

        const path = {
            source: source,
            target: target,
            text: ship.text? ship.text : '',
            index: i ++,
            uuid: ship.uuid
        }

        pathes.push(path)
    })

    return pathes
}

export const fetchNodes = () => {

}

export const fetchShips = () => {

}

export const deleteNodes = () => {

}

export const deleteShips = () => {

}

// 右键菜单选项
export const menuItems = {
    circle: {
        items: [
            {
                label: '新建链接',

            }
        ]
    },
    line: {},
    bakcground: {}
}

// 拖拽和连线状态
export const clearDrag = (that) => {
    return {
      draggingNode: null,
      IsDragging: false
    }
  }
  
export const _cancelLink = () => {
    return {
      isLinking: false,
      source: null,
      target: null,
      event: {}
    }
  }
