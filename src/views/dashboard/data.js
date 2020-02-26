import nodes from '../../api/nodes'

export function getAllGraph() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(nodes)
    }, 500)
  })
}

export const ships = [
  {
    source: 1,
    target: 2
  },
  {
    source: 1,
    target: 3
  }
]

