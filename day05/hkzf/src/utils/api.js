import axios from 'axios'
import { BASE_URL } from './url'
// 创建实例axios实例
const API = axios.create({
  baseURL: BASE_URL
})

export { API }