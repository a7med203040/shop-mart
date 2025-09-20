
'use client'

import { WishListI } from '@/interfaces/WishList';


import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button';
import {  getWishListAction } from './_action/getWishList.action';
import { Trash2Icon } from 'lucide-react';
import { removeWishListAction } from './_action/remove.action';


export default function WishList() {
    const [wishListData, setWishListData] = useState<null|WishListI>(null)
    
  async function getWishList() {
      
   const data = await getWishListAction();
   setWishListData(data)

    
  }
  async function RemoveFromWishlist(productId:string) {
    const data = await removeWishListAction(productId);
    console.log(data);
    

  }

 
    useEffect(()=>{
        getWishList()
    },[])

  return <>
  <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6 mx-auto">
  <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
 
    {wishListData?.data.map((item)=>  <div key={item._id} className="border rounded-lg p-3 flex flex-col items-center shadow-sm">
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
      <p className="text-gray-600">{item.price}</p>
       <Button onClick={()=>RemoveFromWishlist(item.id)} className='p-0.5 cursor-pointer' variant={'destructive'} >remove <Trash2Icon/></Button>
    
    </div> )}
    

     </div>
    </div>

  </>
}
