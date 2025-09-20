'use client'
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, ShoppingBagIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { CartContext } from '../CartContext/CartContext'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
   const {cartData , isLoading} = useContext(CartContext);
   const session = useSession();
  
   
  return <>
  <nav className='bg-gray-200 text-2xl font-semibold shadow sticky top-0'>
    <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
            <h1><Link href={'/'}>shop-mart</Link></h1>
            
            <NavigationMenu>
  <NavigationMenuList>
       <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/products">products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/categories">categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/brands">brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

  </NavigationMenuList>
</NavigationMenu>


<div className='flex'>
    <DropdownMenu>
  <DropdownMenuTrigger>
    <UserIcon/>
    </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {session.status == 'authenticated' ?<>
    <Link href={'/profile'}>
   <DropdownMenuItem>Profile</DropdownMenuItem> 
   </Link>
   
   <DropdownMenuItem onClick={()=>signOut({
    callbackUrl : '/'
   })}>log out</DropdownMenuItem>
  
   
    </> : <>
    <Link href={'/login'}>
   <DropdownMenuItem>login</DropdownMenuItem> 
   </Link>
   <Link href={'/register'}>
   <DropdownMenuItem>register</DropdownMenuItem> 
   </Link>
    </>} 
   
   
     
  </DropdownMenuContent>
</DropdownMenu>
{session.status == 'authenticated' && <div className='relative p-3'>
  <Link href={'/cart'}><ShoppingCartIcon/></Link>

<Badge className=" size-4 rounded-full px-1 absolute top-0 end-2 pb-1.5 pt-1 ">
        <span>{isLoading ? <Loader2 className='animate-spin size-4 '/> : cartData?.numOfCartItems }</span> 
        </Badge>
       
</div>}
</div>
  
        </div>
    </div>
  </nav>
  
  </>
}
