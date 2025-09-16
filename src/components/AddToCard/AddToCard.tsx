"use client"
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { HeartIcon, Loader2, ShoppingCartIcon } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { CartContext } from '../CartContext/CartContext'

export default function AddToCard({productId}:{productId : string}) {
  const [isLoading, setIsLoading] = useState(false);
  const {setCartData } = useContext(CartContext)
 
    async function addProductToCart() {
      setIsLoading(true);
       const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' ,     {
        method : 'POST',
        body : JSON.stringify({productId}),
        headers: {
            token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzAwNjFiMjcxMDg4MWZkNDQ1YWY3ZiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3NDE0OTQwLCJleHAiOjE3NjUxOTA5NDB9.RtaIao_83ovc_TKCh7faM7dLAZFVvd_ve_nBMzun590',
            "Content-Type" : "application/json"
        }
       }) ;
       const data = await response.json();
       setCartData(data);
     data.status == "success" && toast.success(data.message);
       setIsLoading(false);
       console.log(data);
       

    }

  return <>
  
  <CardFooter className='flex gap-1'>
    <Button disabled={isLoading} onClick={addProductToCart} className='bg-black text-white grow' variant="outline">
      {isLoading ? <Loader2 className='animate-spin'/> : <ShoppingCartIcon/>}
       Add to card</Button>

    <HeartIcon/>
    

  </CardFooter>
  </>

}
