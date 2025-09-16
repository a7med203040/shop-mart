import { CategoryI } from "./category"

export interface productI {
  sold: number
  images: string[]
  subcategory: CategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: CategoryI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?:number

}






