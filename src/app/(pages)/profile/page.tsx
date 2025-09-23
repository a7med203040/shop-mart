'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';


import WishList from '@/components/WishList/WishList';
import { Input } from '@/components/ui/input';


interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  wishlist?: WishlistItem[];
}

interface ProfilePageProps {
  user: UserProfile;
  onEdit?: () => void;
  onLogout?: () => void;
  onRemoveFromWishlist?: (id: string) => void;
}


export default function ProfilePage({ user, onEdit, onLogout, onRemoveFromWishlist,}: ProfilePageProps) {

const session = useSession();
// const [emailInput, setEmailInput] = useState('')
const [passwordInput, setPasswordInput] = useState('')
// const handleChangeEmail = (e)=>{
// setEmailInput(e.target.value);
// console.log(emailInput);

// }

const handleChangePassword = (e)=>{
setPasswordInput(e.target.value);
console.log(passwordInput);

}
async function resetPassword() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
    method : 'PUT',
    body:JSON.stringify({
      "email" : session.data?.user.email,
     "newPassword" : "gmjgkjhk,khlk"
    })
  });
  const data = await response.json();
}


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Profile Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mb-8">
       

        <div className="mt-6 space-y-3">
         {/* <Input onBlur={handleChangeEmail} placeholder='Email'></Input> */}
         <Input onBlur={handleChangePassword} type='password' placeholder='Enter new password'></Input>
         
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onBlur={resetPassword}
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Reset password
          </button>
          <button
            onClick={onLogout}
            className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

     <WishList></WishList>
   
    </div>
  );
}
