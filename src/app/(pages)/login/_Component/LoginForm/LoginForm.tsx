"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {signIn} from 'next-auth/react'
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2Icon } from "lucide-react"

const formSchema = z.object({
  email: z.email('invalid email').nonempty('email is required'),
  password: z.string().nonempty('password is required')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , 'invalid password')
})
type FormFields =z.infer<typeof formSchema>


export function LoginForm() {
  let searchParams = useSearchParams();
  const [isLoading, setIsLOading] = useState<boolean>(false);
  const callbackUrl= searchParams.get('callback_url');
  // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password : ''
    },
  })

  // 2. Define a submit handler.
 async function onSubmit(values: FormFields) {
  setIsLOading(true);
 const response = await  signIn('credentials' , {
  email : values.email,
  password : values.password,
  callbackUrl :callbackUrl ??'/',
  redirect:true

 })
    console.log(values);
    console.log(response);
    setIsLOading(false);
    
  }
   return <>
   <Card className="p-6 w-sm">
     <Form  {...form}>
      {searchParams.get('error') ? <h1 className="text-destructive text-2xl text-center py-6">{searchParams.get('error')}</h1> : ''}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="ahmed@gmail.com" type="email" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />
           <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="ahmed@gmail.com" type="password" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />
        <Button className="cursor-pointer w-full" disabled={isLoading} type="submit">
          {isLoading && <Loader2Icon className="animate-spin"/>} Submit</Button>
      </form>
    </Form>
   </Card>
   </>
   
  
}

 


