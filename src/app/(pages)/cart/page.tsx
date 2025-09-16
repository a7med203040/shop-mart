'use client'
import Loading from '@/app/loading';
import { CartContext } from '@/components/CartContext/CartContext';
import Checkout from '@/components/Checkout/Checkout';
import { Button } from '@/components/ui/button';
import { cartResponse } from '@/interfaces/cart';
import { Http2ServerRequest } from 'http2';
import { Loader2, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { json } from 'stream/consumers';
const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.19.953.282 1.638.508.742 1.341 1.258 2.22 1.258h.047M17 13l-2.293 2.293c-.63.63-.19.953.282 1.638.508.742 1.341 1.258 2.22 1.258h.047m-11 0a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4z"
    />
  </svg>
);



export default function Cart() {
let {cartData , isLoading , getCart , setCartData} = useContext(CartContext);
const [removingId, setRemovingId] = useState<null | string>(null);
const [updatingId, setUpdatingId] = useState<null|string>(null);
const [isClearing, setIsClearing] = useState<boolean>(false);


typeof cartData?.data.products[0]?.product =='string'|| cartData == null && getCart();

async function removeProduct(productId : string) {
  setRemovingId(productId)
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+ productId , {
    method : 'DELETE' ,
    headers: {
            token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzAwNjFiMjcxMDg4MWZkNDQ1YWY3ZiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3NDE0OTQwLCJleHAiOjE3NjUxOTA5NDB9.RtaIao_83ovc_TKCh7faM7dLAZFVvd_ve_nBMzun590',
            
            
        }
  });
  const data:cartResponse = await response.json();
  if (data.status == 'success') {
    setCartData(data);
    toast.success('product removed successfully')
  }
 setRemovingId(null)
  console.log(data);
  
  
  
}

async function clearCart() {
  setIsClearing(true);
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/', {
    method : 'DELETE' ,
    headers: {
            token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzAwNjFiMjcxMDg4MWZkNDQ1YWY3ZiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3NDE0OTQwLCJleHAiOjE3NjUxOTA5NDB9.RtaIao_83ovc_TKCh7faM7dLAZFVvd_ve_nBMzun590',
            
            
        }
  });
  const data:cartResponse = await response.json();
  if (data.message == 'success') {
    setCartData(null);
    
  }
 
  console.log(data);
  
  
  setIsClearing(true)
}

async function updateProductCount(productId : string , count : number) {
  setUpdatingId(productId)
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+ productId , {
    method : 'PUT' ,
    body : JSON.stringify({count}) ,
    headers: {
            token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzAwNjFiMjcxMDg4MWZkNDQ1YWY3ZiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3NDE0OTQwLCJleHAiOjE3NjUxOTA5NDB9.RtaIao_83ovc_TKCh7faM7dLAZFVvd_ve_nBMzun590',
             "Content-Type" : "application/json"
            
        }
  });
  const data:cartResponse = await response.json();
  if (data.status == 'success') {
    setCartData(data);
    toast.success('product count updated successfully')
  }
setUpdatingId(null)
  console.log(data);
  
  
  
}

  return <>
  {isLoading ||typeof cartData?.data.products[0]?.product == 'string' ?  <Loading/> : cartData?.numOfCartItems! > 0? 
  <div className="min-h-screen  font-sans  flex items-center justify-center gap-3 ">
    
        {/* Cart Items Section */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-2">Shopping Cart</h1>
          <p className="text-gray-400 mb-8">1 item in your cart</p>
          <div className="space-y-4 ">
            {cartData?.data.products.map((product)=><div key={product._id} className="flex items-center justify-between bg-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={product.product.imageCover}
                  alt={product.product.title}
                  className="w-30 h-30 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-black">
                    {product.product.title}
                  </h3>
                  <p className="text-sm text-black">
                    {product.product.category.name}
                  </p>
                  <p className="text-sm text-black">
                    {product.product.brand.name}
                  </p>
                  <div className="flex items-center text-sm mt-2 text-black">
                    <button disabled={product.count == 1} onClick={()=>updateProductCount(product.product.id , product.count - 1)} className="w-6 h-6 flex items-center justify-center border border-gray-600 rounded-full hover:bg-gray-600 transition-colors">
                      -
                    </button>
                    <span className="mx-2">{updatingId === product.product.id ? <Loader2 className='animate-spin'/> : product.count}</span>
                    <button onClick={()=>updateProductCount(product.product.id , product.count + 1)}  className="w-6 h-6 flex items-center justify-center border border-gray-600 rounded-full hover:bg-gray-600 transition-colors">
                      +
                    </button>
                    <button onClick={()=>removeProduct(product.product.id)}  className="ml-8 text-red-400 hover:text-red-300 transition-colors cursor-pointer flex gap-1 items-center">
                    {removingId == product.product.id && <Loader2 className='animate-spin size-3'/>}  Remove
                    </button>
                  </div>
                </div>
              </div>
              <span className="flex gap-1 text-xl font-bold text-gray-100">
               <span>EGP</span>
               <span>{product.price}</span>  
              </span>
            </div>)}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="md:w-1/3 bg-gray-200 rounded-2xl p-6 shadow-inner flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 text-black">
            <div className="flex justify-between items-center text-lg">
              <span>Subtotal ({cartData?.numOfCartItems})</span>
              <span className="font-semibold text-gray-100">
                {cartData?.data.totalCartPrice}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Shipping</span>
              <span className="font-semibold text-green-400">Free</span>
            </div>
            <div className="border-t border-gray-600 my-4"></div>
            <div className="flex justify-between items-center text-2xl font-extrabold text-black">
              <span>Total</span>
              <span>{cartData?.data.totalCartPrice}</span>
            </div>
          </div>
        <Checkout cartId={cartData?.cartId!}></Checkout>
          <Button className="mt-4 w-full py-3 text-white font-semibold transition-colors duration-300 hover:text-gray-200 mb-2">
            Continue Shopping
          </Button>
          
          <Button onClick={clearCart} variant={'outline'} className='text-destructive hover:text-destructive'> {isClearing ? <Loader2 className='animate-spin'/> :<Trash2Icon/>} Clear cart</Button>
          
        </div>
      
    </div> : <div className='flex items-center justify-center flex-col min-h-[60vh] '>
       <h2 className='mb-3'>Your cart is now empty</h2>
       <Link href={'/products'}>
       <Button>Add products</Button>
       </Link>

    </div>
}
  </>
}
