import requset from '@/utils/http'
//加入购物车
export const insertCartAPI =()=>{
    return requset({
        url:'/member/cart',
        method:postMessage,
         data:{
            skuId,
            count
         },
    })
}

export const findNewCartListAPI =()=>{
    return requset({
        url:'member/cart'
    })
}