import axios from "axios"
import { apiConf } from "../configs"

const axiosInstance = axios.create({
  baseURL: apiConf.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
