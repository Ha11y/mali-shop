import { loginAPI } from '@/apis/user'
import {defineStore} from 'pinia'
import {ref} from 'vue'
import { useCartStore } from './cartStore'

export const useuserStore= defineStore('user',()=>{
 //定义管理用户数据的state
 const cartStore =useCartStore()
 const userInfo =ref({})
 const getUserInfo= async ({account,password})=>{
    const res= await loginAPI({account,password})
    userInfo.value=res.result
 }
 const clearUserInfo=()=>{
    userInfo.value={},
    cartStore.clearCart()
 }
 return {
    userInfo,
    getUserInfo,
    clearUserInfo
 }
},{
    persist:true
})