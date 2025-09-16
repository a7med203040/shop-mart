'use client'
import { CartContext } from '@/components/CartContext/CartContext'
import { item } from '@/interfaces/cart';
import { Order } from '@/interfaces/order';
import Image from 'next/image';
import { log } from 'node:console';
import React, { useContext, useEffect, useState } from 'react'

export default function AllOrders() {
   console.log(localStorage.getItem('userId'));
   const [orders, setOrders] = useState <null|Order[]> (null)

   async function getAllOrders() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/'+ localStorage.getItem('userId'));
    const data : Order[] = await response.json();
    
    setOrders(data);
    
    
    
    
  
   }

console.log(orders);
console.log(orders?.[0]?.cartItems[0]?.product.imageCover);




   useEffect(()=>{
    getAllOrders()} , [])
   

 return<>
 <div className='px-6 py-8'>
  <div className='text-2xl font-semibold mb-6'>all orders</div>
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
   {orders?.map((order)=>  <div  key={order._id} className="rounded-2xl border border-gray-200 shadow-sm bg-white p-5 flex flex-col">
{/* order header */}
  <div className="flex justify-between mb-3 text-sm text-gray-600">
              <span>Order #{order?.id}</span>
               <span>{order?.createdAt}</span>
              
            </div>

             <div className="space-y-3 flex-1">
              {order.cartItems.map((item)=> <div key={item._id} className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
            
             <Image
              src={item.product.imageCover}
             alt={item?.product.title}
             fill
    className="object-cover"
  />              
  
 

                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item?.product?.title}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item?.count} × {item?.price} EGP
                    </p>
                  </div>
                </div>)}
              
             </div>
                {/* Footer */}
            <div className="border-t mt-4 pt-3 text-sm">
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-semibold">{order?.totalOrderPrice} EGP</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Payment:</span>
                <span>{order?.paymentMethodType}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Status:</span>
                <span className={order.isDelivered ? "text-green-600" : "text-yellow-600"}>
                  {order?.isDelivered ? "Delivered" : "Processing"}
                </span>
              </div>
            </div>
    </div>)}
  </div>

 </div>
     
            
      
      
 </>
}