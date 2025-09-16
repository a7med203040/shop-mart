import { Card, CardFooter } from '@/components/ui/card';
import { CategoryI } from '@/interfaces/category';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Categories() {
const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
const {data : categories} = await response.json();
console.log(categories);

  return <>
  <div className="container">
    <div className="flex flex-wrap gap-3">

 {categories.map!((category : CategoryI)=>  
  
  <Link key={category._id} href={`/categories/${category._id}`}>
  <Card key={category._id}>
  
        <Image  src={category.image} width={300} height={300} alt=''></Image>
        <div className='  border-t-2'>
          <h2 className='text-center   '>{category.name}</h2>
        </div>
      </Card>
  </Link>
   
      
    )}
    </div>
  
  
  </div>
  </>
}
