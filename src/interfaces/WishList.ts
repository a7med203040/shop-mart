import { productI } from "./product";

export interface WishListI{
    count : number,
    data : productI[],
    status : string
}