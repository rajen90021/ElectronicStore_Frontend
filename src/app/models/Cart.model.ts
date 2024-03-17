import { Product } from "./Product.model";
import { User } from "./user.model";

export interface Cart{

    cartid:string,
    createdat:Date,
    items:cartitem[],
    users:User
}

export interface cartitem{
    cartitemid:number,
    product:Product,
    quantity:number,
    totolprice:number,

}