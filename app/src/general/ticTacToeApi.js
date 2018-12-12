import axios from 'axios'
const API_URL = 'http://localhost:8081/api'

export default {
  Users: {
    index: () => axios.get(`${API_URL}/users`),

    postOne: user => axios.post(`${API_URL}/users`, user),

    getOne: userId => axios.get(`${API_URL}/users/${userId}/details`),

    logIn: user => axios.post(`${API_URL}/users/login`, user),

    updateOne: (userId, updatedInfo) => axios.put(`${API_URL}/users/${userId}`, updatedInfo),

    ranking: () => axios.get(`${API_URL}/users/ranking`),

    matches: userId => axios.get(`${API_URL}/users/${userId}/matches`)
  },
  Matches: {
    index: () => axios.get(`${API_URL}/matches`),

    postOne: match => axios.post(`${API_URL}/matches`, match)

  }
}