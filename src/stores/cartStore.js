//封装购物车模块
import { computed } from 'vue'
import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useuserStore} from './user'
import {insertCartAPI,findNewCartListAPI} from '@/apis/cart'
export const useCartStore= defineStore('cart',()=>{
    //定义state
    const userStore= useuserStore()
    const isLogin =computed(()=>userStore.userInfo.token)
    const cartList =ref([])
    const addCart=async (goods)=>{
      //添加购物车
      //已经添加过 count +1
      //没有添加过 -直接push
      //通过匹配传递过来的商品对象中skuId 能不能再cartList 中找到，找到了就是添加过
      const {skuId,count} =goods
      if(isLogin.value){
        await insertCartAPI({skuId,count})
        const res= await findNewCartListAPI()
        cartList.value=res.result
      }else{
        
      }
      const item =cartList.value.find((item)=>goods.skuId===item.skuId)
      if(item){
        item.count++
      }else{
         console.log(cartList)
        cartList.value.push(goods)
       
      }
    }
    const delCart =(skuId)=>{
       const idx= cartList.value.findIndex((item)=>skuId===item.skuId)
        cartList.value.splice(idx,1)
    }
    //单选功能
    const singleCheck=(skuId,selected)=>{
       const item =cartList.value.find((item)=>item.skuId===skuId)
       item.selected=selected
      
    }
    const allCheck=(selected)=>{
      cartList.value.forEach(item=>item.selected=selected)
    }
   const allCount = computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
   const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))

   //是否全选
   const isAll =computed(()=>cartList.value.every((item)=>item.selected))
   //已选数量
   const selectedCount=computed(()=>cartList.value.filter(item=> item.selected).reduce((a,c)=>a+c.count,0))
   const selectedPrice=computed(()=>cartList.value.filter(item=> item.selected).reduce((a,c)=>a+c.count*c.price,0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        allCheck,
        isAll,
        selectedCount,
        selectedPrice
    }
},
{
    persist:true
}
)