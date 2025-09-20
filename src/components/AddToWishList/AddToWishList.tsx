
import { getUserToken } from '@/app/Helpers/getUserToken/getUserToken'
import { HeartIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button';

export default function AddToWishList({productId}:{productId:string}) {


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
        console.log(data);
        
    }
  return <>
 <Button onClick={ addProductToWishList}>
     <HeartIcon/>
 </Button>
  </>
}
