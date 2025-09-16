import { CategoryI } from '@/interfaces/category';
import { log } from 'console';
import Link from 'next/link';
import React from 'react'

export default async function Brands() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
  const {data:brands}:{data : [CategoryI]} = await response.json();
  log(brands);
  return <>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3">
 {brands.map((brand)=> 
 <Link key={brand._id} href={'/brands/'+brand._id}>
 <div className='flex flex-col items-center border border-gray-300 border-solid'>
     <img
        src={brand.image}
        alt={brand.name}
        className="w-24 h-24 object-contain mb-2"
        width={600}
        height={600}
      />
      <p className="text-2xl font-semibold text-gray-800">{brand.name}</p>
  </div>
 </Link>)}
    </div>
  
  </>
}
