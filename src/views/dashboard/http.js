import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

export function getNodes() {
  return service({
    url: '/',
    method: 'get'
  })
}
