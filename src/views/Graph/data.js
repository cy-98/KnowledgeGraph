import nodes from '../../api/normal_nodes'

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
  },
  {
    source: 1,
    target: 4
  },
  {
    source: 1,
    target: 5
  },
  {
    source: 1,
    target: 6
  },
  {
    source: 1,
    target: 7
  },
  {
    source: 2,
    target: 8
  },
  {
    source: 2,
    target: 9
  }
]

