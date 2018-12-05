import axios from 'axios'
const API_URL = 'http://localhost:8081/api'

export default {
  Users: {
    index: () => {
      return axios.get(`${API_URL}/users`)
    },
    postOne: (user) => {
      return axios.post(`${API_URL}/users`, user)
    },
    getOne: (userId) => {
      return axios.get(`${API_URL}/users/${userId}/details`)
    },
    updateOne: (updatedInfo) => {
      return axios.put(`${API_URL}/users/${userId}`, updatedInfo)
    },
    ranking: () => {
      return axios.get(`${API_URL}/users/ranking`)
    },
    matches: (userId) => {
      return axios.get(`${API_URL}/users/${userId}/matches`)
    }
  }
}