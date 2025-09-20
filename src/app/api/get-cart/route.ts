import { getUserToken } from "@/app/Helpers/getUserToken/getUserToken";
import { cartResponse } from "@/interfaces/cart";
import { NextResponse } from "next/server";

export async function GET() {
    const token = await getUserToken();
     const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
            method : 'GET',
            headers : {
                token : token+''
            }
        }) ;
        const data : cartResponse = await response.json()  ;

        return NextResponse.json(data)
}