
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
  