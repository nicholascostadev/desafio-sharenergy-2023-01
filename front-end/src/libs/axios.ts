import axios from 'axios'

export const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:4444',
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:4444',
    'Access-Control-Allow-Credentials': 'true',
  },
})
