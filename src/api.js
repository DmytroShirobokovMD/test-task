import axios from 'axios'

//dont use env just for test
export const baseURL = 'http://localhost:8080'

const api = axios.create({ baseURL })

export default api