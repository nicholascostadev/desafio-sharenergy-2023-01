import axios from 'axios'

export const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_DATABASE_URL
    : 'http://localhost:4444',
  headers: {
    'Access-Control-Allow-Origin': import.meta.env.PROD
      ? import.meta.env.VITE_DATABASE_URL
      : 'http://localhost:4444',
    'Access-Control-Allow-Credentials': 'true',
  },
})
