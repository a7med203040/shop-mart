'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import CartContextProvider from '../CartContext/CartContext'
import Navbar from '../navbar/navbar'
import { Toaster } from 'react-hot-toast'

export default function Provider({children}:{children : ReactNode}) {
  return (
    <SessionProvider>
         <CartContextProvider>
       <Navbar/>
       <div className="container mx-auto py-5">
        
         {children}
         <Toaster/>
       </div>
        </CartContextProvider>
       
    </SessionProvider>
  )
}
