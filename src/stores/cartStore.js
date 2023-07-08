//封装购物车模块
import { computed } from 'vue'
import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useCartStore= defineStore('cart',()=>{
    //定义state
    const cartList =ref([])
    const addCart=(goods)=>{
      //添加购物车
      //已经添加过 count +1
      //没有添加过 -直接push
      //通过匹配传递过来的商品对象中skuId 能不能再cartList 中找到，找到了就是添加过
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
   const allCount = computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
   const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck
    }
},
{
    persist:true
}
)