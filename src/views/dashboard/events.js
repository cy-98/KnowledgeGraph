
// import http from '../api/http'

export const updateNodes = () => {

}

export const updateShips = () => {

}

export const fetchNodes = () => {

}

export const fetchShips = () => {

}

export const deleteNodes = () => {

}

export const deleteShips = () => {

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
  