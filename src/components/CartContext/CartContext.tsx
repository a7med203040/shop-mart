 'use client'
import { getCartAction } from "@/app/(pages)/products/_action/AddToCart.action";
import { getUserToken } from "@/app/Helpers/getUserToken/getUserToken";
import { cartResponse } from "@/interfaces/cart";
import { useSession } from "next-auth/react";
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
    const session = useSession()
    

 async function getCart() {
     
   const data = await getCartAction();
    setCartData(data) ;
    if (cartData?.data?.cartOwner) {
        localStorage.setItem('userId' , cartData?.data.cartOwner)
        
        
    }
    setIsLoading(false);
    
        
    
}
    
    useEffect(()=>{
      
         getCart();
       
        
       
    },[session.status])

return  <CartContext.Provider value={{cartData , setCartData , isLoading , setIsLoading , getCart   }}>
    {children}
</CartContext.Provider>
}