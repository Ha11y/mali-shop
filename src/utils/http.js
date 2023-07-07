import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useuserStore} from '@/stores/user'

 const httpInstance= axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

//拦截器

//axios请求拦截器
httpInstance.interceptors.request.use(config=>{
    //从pinia 中获取token数据
    const userStore =useuserStore()
    const token=userStore.userInfo.token
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},e=>Promise.reject(e))



//axios 响应式拦截器
httpInstance.interceptors.response.use(res=>res.data,e=>{
    ElMessage({type:'warning',message:e.response.data.message})
    return Promise.reject(e)
})
export default httpInstance