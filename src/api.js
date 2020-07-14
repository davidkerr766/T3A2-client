import axios from 'axios'

const api = axios.create({
    baseURL: 'https://limitless-island-04616.herokuapp.com/api'
})

export default api