import axios from 'axios'


const requests = axios.create({
    baseURL:'http://127.0.0.1:8080/user',
    timeout:5000
})
requests.interceptors.request.use(
    config=>{
        if(sessionStorage.getItem('TOKEN')){
            config.headers!['Authorization'] = sessionStorage.getItem('TOKEN');
        }
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