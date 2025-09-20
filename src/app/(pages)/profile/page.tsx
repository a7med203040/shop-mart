'use client';

import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import img from '../../../../public/bagels.jpg'
import WishList from '@/components/WishList/WishList';


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


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Profile Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-blue-100 shadow">
            <Image
              src={img}
              alt={''}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-semibold">''</h1>
          <p className="text-gray-500 text-sm">Shop-Mart Member</p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-800">''</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-medium">Phone:</span>
            <span className="text-gray-800">''</span>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onEdit}
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Edit Profile
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
