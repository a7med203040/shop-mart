import { Loader2, Loader2Icon, SplineIcon } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return <>
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative flex items-center justify-center">
        {/* --- Spinners Behind the Text --- */}
        {/* Outer solid ring */}
        <div className="absolute w-32 h-32 border-4 border-black border-t-transparent rounded-full animate-spin" />

        {/* Middle dotted ring */}
        <div className="absolute w-24 h-24 border-4 border-dotted border-black border-t-transparent rounded-full animate-spin-reverse" />

        {/* Inner dashed ring */}
        <div className="absolute w-16 h-16 border-4 border-dashed border-black border-t-transparent rounded-full animate-spin" />

        {/* Text in the center, above all rings */}
        <span className="text-5xl font-extrabold text-gray-800 z-10">
          shop-mart
        </span>
      </div>
    </div>

  </>
}
