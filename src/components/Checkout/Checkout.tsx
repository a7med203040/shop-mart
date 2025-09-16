'use client'
import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { json } from 'stream/consumers'
import { Loader2Icon } from 'lucide-react'


export default function Checkout({cartId}:{cartId:string}) {

    let cityInput = useRef<null|HTMLInputElement>(null);
    let detailsInput = useRef<null|HTMLInputElement>(null);
    let phoneInput = useRef<null|HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const shippingAddress = {
        city : cityInput.current?.value ,
       details :detailsInput.current?.value ,
        phone : phoneInput.current?.value
    }

  async function checkoutSession() {
    setIsLoading(true);
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
    method : 'POST',
    body : JSON.stringify({shippingAddress}),
    headers:{
        token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzAwNjFiMjcxMDg4MWZkNDQ1YWY3ZiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3NDE0OTQwLCJleHAiOjE3NjUxOTA5NDB9.RtaIao_83ovc_TKCh7faM7dLAZFVvd_ve_nBMzun590',
             "Content-Type" : "application/json"
    }
    
    });
    const data = await response.json();
    if (data.status == 'success') {
      location.href= data.session.url
    }
    setIsLoading(false);
    
    
  }


  return <>
   
           <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='w-full cursor-pointer'>Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a shipping address</DialogTitle>
            <DialogDescription>
              please make sure it's a current address
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label  htmlFor="city">city</Label>
              <Input ref={cityInput} id="city"  />
            </div>
             <div className="grid gap-3">
              <Label  htmlFor="details">details</Label>
              <Input ref={detailsInput} id="details"  />
            </div>
             <div className="grid gap-3">
              <Label  htmlFor="phone">phone</Label>
              <Input ref={phoneInput} id="phone"  />
            </div>
           
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={checkoutSession} type="submit">{isLoading &&<Loader2Icon className='animate-spin'/>  } visa</Button>
            <Button  type="submit">cash</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  </>
}
