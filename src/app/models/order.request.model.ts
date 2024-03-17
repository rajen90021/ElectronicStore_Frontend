export interface orderRequest{
    billingName:string,
    billingaddress:string,
    billingphone:string,
    cartid:string,
    userid:string,
    orderstatus:orderstatus,
    paymentstatus:paymentstatus
}

export enum orderstatus{
PENDING='PENDING',PROCESSING='PROCESSING',DISPATCH='DISPATCH',DELIVERED='DELIVERED'
}

export enum paymentstatus{
NOTPAID='NOTPAID',PAID='PAID'
}