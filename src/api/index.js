import axios from 'axios'

const LOCAL_URL = '//localhost:3001'
const PRODUCTION_URL = '//ec2-52-14-239-7.us-east-2.compute.amazonaws.com:3001'

const envIsProduction = process.env.NODE_ENV === 'production'
const API_URL = envIsProduction ? PRODUCTION_URL : LOCAL_URL

const usersApi = axios.create({
  baseURL: `${API_URL}/usuarios`
})

export default {
  users: usersApi
}
