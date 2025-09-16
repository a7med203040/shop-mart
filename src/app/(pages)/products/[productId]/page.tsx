import { productI } from '@/interfaces/product';
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductSlider from '@/components/productSlider/ProductSlider';
import AddToCard from '@/components/AddToCard/AddToCard';

export default async function ProductDetails({params}:{params:Params}) {
let{productId} = await params ;
let x = await params;
console.log(x);

const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/'+productId);
const {data : product}:{data : productI} = await response.json();
console.log(product);


  return <>
  <Card className='grid md:grid-cols-3 items-center'>
    <div className='col-span-1'>
      <ProductSlider images={product.images} altContent={product.title} />
          
    </div>
<div className='col-span-2 space-y-4 p-4'>
    <CardHeader>
      <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle>{product.title}</CardTitle>
    <CardDescription>{product.description}</CardDescription>
    
  </CardHeader>
  <CardContent>
    <CardDescription>{product.category.name}</CardDescription>
   <div className='flex justify-between items-center mt-3'>
   <p className='flex gap-1'><StarIcon className='text-yellow-500' /><span>{product.ratingsAverage}</span></p>
   <p>Reviewd : {product.ratingsQuantity}</p>
   </div>
    <div className='flex justify-between items-center mt-3'>
   <p className='flex gap-1'>Quantitiy : <span>{product.quantity}</span></p>
   <p className='flex gap-1 items-center'>EGP <span className='text-xl font-semibold'>{product.price}</span> </p>
   </div>
  </CardContent>
<AddToCard productId ={product.id}/>
</div>
</Card>
  </>
}

