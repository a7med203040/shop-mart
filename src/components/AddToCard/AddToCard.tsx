"use client"
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { HeartIcon, Loader2, ShoppingCartIcon } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { CartContext } from '../CartContext/CartContext'
import { addToCartAction } from '@/app/(pages)/products/_action/AddToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AddToWishList from '../AddToWishList/AddToWishList'


export default function AddToCard({productId}:{productId : string}) {
  const [isLoading, setIsLoading] = useState(false);
  const {setCartData } = useContext(CartContext);
  const session = useSession();
  const router = useRouter()
 
    async function addProductToCart() {
     if (session.status == 'authenticated') {
       setIsLoading(true);
      const data = await addToCartAction(productId)
       setCartData(data);
     data.status == "success" && toast.success(data.message);
       setIsLoading(false);
       console.log(data);
       
     }else{
     router.push('/login')
     }

    }

  return <>
  
  <CardFooter className='flex gap-1'>
    <Button disabled={isLoading} onClick={addProductToCart} className='bg-black text-white grow' variant="outline">
      {isLoading ? <Loader2 className='animate-spin'/> : <ShoppingCartIcon/>}
       Add to card</Button>

    <AddToWishList productId = {productId} ></AddToWishList>
    

  </CardFooter>
  </>

}
