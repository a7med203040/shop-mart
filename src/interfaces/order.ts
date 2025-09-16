
import { item } from "./cart";
import { CategoryI } from "./category";
import { productI } from "./product";
import { UserInfo } from "./userInfo";

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}





export interface OrderCartItem {
  _id: string;
  count: number;
  price?: number;                  // include if your API sometimes sends it
  product: productI;
}

export interface Order {
  _id: string;
  id?: number;                     // optional numeric id if API provides it
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;       // e.g. "card", "cash"
  isPaid: boolean;
  isDelivered: boolean;
  createdAt?: string;
  updatedAt?: string;
  paidAt?: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
}


