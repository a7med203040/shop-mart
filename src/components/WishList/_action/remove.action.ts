'use server'
import { getUserToken } from "@/app/Helpers/getUserToken/getUserToken";

 export async function removeWishListAction(productId:string) {
        const token = await getUserToken();
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/'+productId,{
            method:'DELETE',
            headers : {
                token : token+''
            }
        });

        const data = await response.json();
        
        console.log(data);

        return data
        
    }