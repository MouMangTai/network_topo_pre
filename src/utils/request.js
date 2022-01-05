import axios from 'axios'
import {ElLoading, ElNotification} from 'element-plus'
import { reactive,nextTick  } from 'vue'

const request = axios.create({
    baseURL: "http://localhost:12201",
    timeout: 10000
})
let loadingInstance = null;
// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    const options = {}
    loadingInstance = ElLoading.service(options)

    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        nextTick(() => {
            loadingInstance.close()
            //写入操作
        }).then(r =>{
        })
        return res;
    },
    error => {
        nextTick(() => {
            loadingInstance.close()
            //写入操作
        }).then(r =>{

        })
        ElNotification.error({title: 'Error', message: error, offset: 100,});
         // for debug
        return Promise.reject(error)
    }
)


export default request

