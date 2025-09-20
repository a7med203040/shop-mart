'use server'
import { getUserToken } from "@/app/Helpers/getUserToken/getUserToken";

export async function getWishListAction() {
        const token = await getUserToken();
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
            headers : {
                token : token+''
            }
        });

        const data = await response.json();
        
        console.log(data);

        return data
        
    }

   