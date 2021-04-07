import axios from "axios";

//方法4
export function request(config){

    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 10000
    })

    //axios拦截器：axios.interceptors
    //请求拦截的作用
    instance.interceptors.request.use(config=>{
      //1.拦截器中所做的事： 比如config中的一些信息不符合服务器的要求，可以在此处理
      //2.比如每次发送网络请求时，在页面显示一个请求的图标
      //3.比如某些网络请求（如登录（token）），必须携带一些特殊的信息，如没有携带再次跳转，并提示

      //console.log(config);
      return config
    },error => {
      console.log(error);
    })
    //响应拦截
    instance.interceptors.response.use(res=>{

      console.log(res);
      return res.data
    },err=>{
      console.log(err);
    })


    //2.发送真正的网络请求,返回的实际上是个promise
    return instance(config)

}


