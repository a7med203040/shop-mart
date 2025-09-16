 'use client'
import { cartResponse } from "@/interfaces/cart";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
    cartData : cartResponse|null ,
    setCartData : (value :cartResponse|null)=> void ,
    isLoading : boolean ,
    setIsLoading : (value : boolean)=>void ,
    getCart : ()=>void ,
    
}>({
cartData : null ,
setCartData : ()=>{} ,
isLoading : false ,
setIsLoading : ()=>{} ,
getCart()  { },


});

export default function CartContextProvider({children}:{children : ReactNode}){

    const [cartData, setCartData] = useState<cartResponse|null>(null);
    const [isLoading, setIsLoading] = useState(true);
    

 async function getCart() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
        method : 'GET',
        headers : {
            token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzAwNjFiMjcxMDg4MWZkNDQ1YWY3ZiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3NDE0OTQwLCJleHAiOjE3NjUxOTA5NDB9.RtaIao_83ovc_TKCh7faM7dLAZFVvd_ve_nBMzun590'
        }
    }) ;
    const data : cartResponse = await response.json()  ;
    setCartData(data) ;
    if (cartData?.data.cartOwner) {
        localStorage.setItem('userId' , cartData?.data.cartOwner)
        
        
    }
    setIsLoading(false);
    
        
    }

    useEffect(()=>{
        getCart();
        
       
    },[cartData?.data])

return  <CartContext.Provider value={{cartData , setCartData , isLoading , setIsLoading , getCart   }}>
    {children}
</CartContext.Provider>
}