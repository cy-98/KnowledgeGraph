import nodes from './nodes'

export function getAllGraph() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(nodes)
    }, 1000)
  })
}
