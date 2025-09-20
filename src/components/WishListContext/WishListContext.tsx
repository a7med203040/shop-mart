// 'use client'
// import { addToCartAction } from "@/app/(pages)/products/_action/AddToCart.action";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { createContext, ReactNode, useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { CartContext } from "../CartContext/CartContext";

// export const wishListContext = createContext<{ addProductToCart : (productId:string)=>void }>({addProductToCart(productId) { }});

// export default function wishListContextProvider({children}:{children : ReactNode}){
//     const {cartData , setCartData}=useContext(CartContext)
//     const session = useSession();
//     const router = useRouter()
//     const [isLoading, setIsLoading] = useState<boolean>(false)
//      async function addProductToCart(productId:string) {
//      if (session.status == 'authenticated') {
//        setIsLoading(true);
//       const data = await addToCartAction(productId)
//        setCartData(data);
//      data.status == "success" && toast.success(data.message);
//        setIsLoading(false);
//        console.log(data);
       
//      }else{
//      router.push('/login')
//      }
// }

// return <wishListContext.Provider value={{addProductToCart}}>
//     {children}
// </wishListContext.Provider>
// }