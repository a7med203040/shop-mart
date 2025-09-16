'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

export default function ProductSlider({images , altContent} : {images : string[] ,altContent : string}) {
  return <>
  <Carousel opts={{loop: true,}}  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
  <CarouselContent>
   {images.map((img)=> <CarouselItem><Image key={images.indexOf(img)}  src={img} alt={altContent} width={400} height={400}></Image>
</CarouselItem>)}
    
  </CarouselContent>
 
</Carousel>
  </>
}
