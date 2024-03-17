import { Product } from "./Product.model";
import { orderstatus, paymentstatus } from "./order.request.model";
import { User } from "./user.model";

export interface Order{
    billingName:string,
    billingaddress:string,
    billingphone:string,
    deliverddate:Date,
    orderamount:number,
    orderDate:Date,
    orderid:string,
    orderstatus:orderstatus,
    paymentstatus:paymentstatus,
    orderitems:orderitem[],
    users:User
}


export interface orderitem{
    orderitemid:number,
    product:Product,
    quantity:number,
    totalprice:number
}

export interface OrderResponse{
    content:Order[],
    lastpage:boolean,
    pagenumber:number,
    pageseize:number,
    totalelement:number,
    totalpages:number
}


export interface updatorderrequest{
    billingAddress:string,
    billingName:string,
    billingPhone:string,
    deliveredDate:Date,
    orderStatus:string,
    paymentStatus:string


}