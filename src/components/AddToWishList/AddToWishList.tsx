'use client'
import { getUserToken } from '@/app/Helpers/getUserToken/getUserToken'
import { HeartIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { WishListI } from '@/interfaces/WishList';
import toast, { Toaster } from 'react-hot-toast';

export default function AddToWishList({productId}:{productId:string}) {

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [addData, setAddData] = useState<null|WishListI>(null)


    async function addProductToWishList() {
        console.log(productId);
        
        
        const token = await getUserToken();
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
            method : 'POST',
            headers:{
                token : token+'',
                  "Content-Type" : "application/json"
            },
            body:JSON.stringify({'productId':productId})
        });
        const data = await response.json();
        setAddData(data);
        toast.success('product added successfully to your wish list')
        console.log(data);
        
    }
  return <>

     <HeartIcon className={addData?.status=='success'? 'text-red-500 cursor-pointer': 'cursor-pointer'}  onClick={addProductToWishList}/>
 
  </>
}
