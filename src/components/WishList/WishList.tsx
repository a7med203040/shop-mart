
'use client'

import { WishListI } from '@/interfaces/WishList';


import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button';
import {  getWishListAction } from './_action/getWishList.action';
import { Loader2Icon, Trash2Icon, XCircleIcon } from 'lucide-react';
import { removeWishListAction } from './_action/remove.action';
import Link from 'next/link';
import AddToCard from '../AddToCard/AddToCard';
import { log } from 'util';
import { useSession } from 'next-auth/react';


export default function WishList() {
    const [wishListData, setWishListData] = useState<null|WishListI>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    
  async function getWishList() {
      
   const data = await getWishListAction();
   setWishListData(data);
   
   
  
   

    
  }
  async function RemoveFromWishlist(productId:string) {
    setIsLoading(true);
    const data = await removeWishListAction(productId);
    console.log(data);
    setWishListData(data);
    setIsLoading(false);
    

  }
  

 
    useEffect(()=>{
        getWishList()
    },[])

  return <>
  <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6 mx-auto">
  <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>

 {wishListData?.data.length == 0 ? <div className='flex flex-col justify-center items-center p-7 gap-2 min-h-[40vh] cursor-pointer '>
<h2>Your wish List is empty </h2>
<Link href={'/products'}>
<Button>view products</Button>
</Link>
</div>:  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
 
    {wishListData?.data.map((item)=>  <div key={item._id} className="relative border rounded-lg p-3 flex flex-col items-center shadow-sm">
      <XCircleIcon  onClick={()=>RemoveFromWishlist(item.id) } className='absolute top-1 end-1 cursor-pointer'/>
      <div className="relative w-32 h-32 mb-2">
        <Image src={item.imageCover}
          alt={item.title}
          width={300}
          height={300}
          className="object-cover rounded-md w-full h-full"
        >

        </Image>
          
      </div>
      <p className="font-medium text-center">{item.title}</p>
      <p className="text-gray-600">{item.price} $</p>
      <div className='flex flex-col gap-1 justify-center items-center'>
         {/* <Button onClick={()=>RemoveFromWishlist(item.id)} className=' cursor-pointer' variant={'destructive'} > {isLoading? <Loader2Icon className='animate-spin'/> : <Trash2Icon/>}remove </Button> */}
       <AddToCard productId={item.id}></AddToCard>
      </div>
    
    </div> )}
    

     </div> }
    </div>

  </>
}
