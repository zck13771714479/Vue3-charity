import axios from 'axios'


const requests = axios.create({
    baseURL:'/mock',
    timeout:5000
})
requests.interceptors.request.use(
    config=>{
        return config
    },
    error=>{
        console.log('error',error);
    }
)

requests.interceptors.response.use(
    response=>{
        return response
    },
    error=>{
        console.log('error',error);
    }
)
export default requests