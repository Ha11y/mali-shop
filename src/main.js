

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/styles/common.scss'
import { useIntersectionObserver } from '@vueuse/core'
const app = createApp(App)
//测试接口函数

app.use(createPinia())
app.use(router)

app.mount('#app')
//定义全局指令

app.directive('img-lazy',{
    mounted(el,binding){
      useIntersectionObserver(
       el,
        ([{ isIntersecting }]) => {
         if(isIntersecting){
            el.src=binding.value
         }
        },
      )
    }
})