import HttpRequest from '@/libs/axios'
// import config from '@/config'
// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
// const baseUrl = config.baseUrl.dev
const axios = new HttpRequest("http://localhost:8088/api/")
export default axios
