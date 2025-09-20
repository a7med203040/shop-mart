'use server'

import { getUserToken } from "@/app/Helpers/getUserToken/getUserToken";
import { cartResponse } from "@/interfaces/cart";


export async function addToCartAction(productId : string) {
   
     const token = await getUserToken()
     const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' ,     {
        method : 'POST',
        body : JSON.stringify({productId}),
        headers: {
            token : token +'',
            "Content-Type" : "application/json"
        }
       }) ;
       const data = await response.json();

       return data
}

export async function getCartAction() {
   
     const token = await getUserToken();
     const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
            method : 'GET',
            headers : {
                token :token +''
            }
        }) ;
    const data : cartResponse = await response.json()  ;
       return data
}

