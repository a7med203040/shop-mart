import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <section className="max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome to Our E-Commerce Store
        </h1>
        <p className="text-gray-600 mb-8">
          Discover the latest products and browse categories tailored for you.
        </p>

        <div className="flex gap-4 justify-center">
         <Link href={'/products'}>
         <Button className="p-7 cursor-pointer" >view products</Button>
         </Link>
          <Link href={'/categories'}>
         <Button className="p-7 cursor-pointer" >browse categories</Button>
         </Link>
         
        </div>
      </section>
    </main>
  );
}
