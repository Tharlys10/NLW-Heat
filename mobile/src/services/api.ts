import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://100.64.156.230:3333'
})