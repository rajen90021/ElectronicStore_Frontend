import { Component } from '@angular/core';
import { Cart, cartitem } from '../../../models/Cart.model';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../service/auth.service';
import { CartService } from '../../../service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { updatecart } from '../../../store/cart/cart.action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { orderRequest, orderstatus, paymentstatus } from '../../../models/order.request.model';
import { OrderService } from '../../../service/order.service';
import { PaymentService } from '../../../service/payment.service';
import { error } from 'console';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


   cart ?: Cart
   user?:User

   orderRequest:orderRequest={
    billingName:'',
    billingaddress:'',
    billingphone:'',
    cartid:'',
    userid:'',
    orderstatus:orderstatus.PENDING,
    paymentstatus:paymentstatus.NOTPAID
   }

   constructor( private router:Router ,
    private authserive:AuthService,
    public cartservice:CartService,
    private tost:ToastrService,
    private _toastr: ToastrService,
    private _payment: PaymentService,
    private orderserive:OrderService,

    private modelSerivce:NgbModal,
    
    private cartstore:Store<{cart:Cart}>
    ){

       authserive.getloggindata().subscribe({
        next:data=>{


          if(!data.login){
//  tost.error("need to login first ");
// alert("need to login first")
 router.navigate(['/login']); 
          }
          this.user=data.dto
         

         this.loadcart();
        }
       })
   }

   loadcart(){
      if(this.user){
        this.cartservice.getcardofuser(this.user.userid).subscribe({
          next:cartt=>{
            this.cart=cartt;
            console.log(this.cart)

            this.cartstore.dispatch(updatecart(this.cart))

            this.orderRequest.userid=this.user?.userid as string
            this.orderRequest.cartid=cartt.cartid
            console.log(this.orderRequest)
          },
          error:err=>{
            console.log(err);
            this.tost.error("error in loading cart");
          },
        })
      }
   }


   increasequantity(cartitem:cartitem){
      this.cartservice.additemtocart(this.user?.userid as string,{productid:cartitem.product.id,quantity:cartitem.quantity+1}).subscribe({
  next:cart=>{
    this.tost.success("quantity updated")
    this.cart=cart;
    this.cartstore.dispatch(updatecart(cart));
  }
      })
   }


   decreasequantity(cartitem:cartitem){

    const quantitytoupdate= cartitem.quantity-1;
      if(quantitytoupdate <= 0){
        console.log(cartitem.quantity)
        this.tost.error("quantiy must be greater than 0")
        return;
      }
     
      this.cartservice.additemtocart(this.user?.userid as string,{productid:cartitem.product.id,quantity:cartitem.quantity-1}).subscribe({
        next:cart=>{
          this.tost.warning("quantity decrease ")
          this.cart=cart;
          this.cartstore.dispatch(updatecart(cart));
        }
            })
   }

   deletecart(cartitem: cartitem) {
    // if (!confirm('Are you sure you want to delete this item from your cart?')) {
    //   return; // If user cancels deletion, do nothing
    // }
  
    this.cartservice.removeitemfromcart(this.user?.userid as string, cartitem.cartitemid).subscribe({
      next: (data:any) => {
        
        if(data.sucess){
          this.tost.info("Item removed from cart");

          if(this.cart){
            this.cart={
              ...this.cart,
              items:this.cart.items.filter((item)=>{
                return item.cartitemid !=cartitem.cartitemid
              })
            };
            this.cartstore.dispatch(updatecart(this.cart));
          }
        }
      },
      error: err => {
        console.log(err);
        this.tost.error("Error in removing item from cart");
      }
    });
  }
  

  clearcart(){
   
    this.cartservice.clearcart(this.user?.userid as string).subscribe({
      next:(data:any)=>{
        if(data.sucess){
    
          this.tost.success("cart cleared ");
        }

        if(this.cart){
        
          this.cart={...this.cart,items:[] };
          this.cartstore.dispatch(updatecart(this.cart));
        }
      }
    })
  }


  placeorder(content :any){
 if(this.cart && this.cart.items.length>0){
  this.modelSerivce.open(content,{ ariaLabelledBy: 'modal-basic-title',size:'lg' })
 }
  }

  orderform(event :SubmitEvent){
 console.log(this.orderRequest)

 if(this.orderRequest.billingName.trim()===''){
  this.tost.warning("billing name is required ")
  return
 }
 if(this.orderRequest.billingaddress.trim()===''){
  this.tost.warning("billing address is required ")
  return
 }
 if(this.orderRequest.billingphone.trim()===''){
  this.tost.warning("billing phone is required ")
  return
 }

 this.orderserive.createorder(this.orderRequest).subscribe({
  next:(order:any)=>{

    this.tost.success('order created ') 
    this.tost.info("processing for payment ")
    console.log(order)
    this.modelSerivce.dismissAll();
    this.loadcart();

            // ***************************
            // initiate payment
 
             this._payment.initiatepayment(order.orderid).subscribe({
                     next:(data:any)=>{
                     console.log(data)
        
                    const subscription =    this._payment.payWithRazorpay({
                       amount: data.amount,
                    razorpayOrderId: data.razorpay_orderid,
                   userName: order.users.name,
                     email: order.users.email,
                     contact: '+917097896966',
                       }).subscribe({
                     next: (data) => {
                //success
                console.log('from cart component');
                console.log(data);
                subscription.unsubscribe();
                // server api call karni hai


                this._payment
                .captureAndVarifyPayment(order.orderid, data)
                .subscribe({
                  next: (data: any) => {
                    console.log(data);
                    this._toastr.success(data.message);
                  },
                  error: (erro) => {
                    console.log(erro);
                    this._toastr.error('Error in capturing payment !!');
                  },
                });


              },
              error: (error) => {
                // error
                console.log('error from cart component');
                console.log(error);
                this._toastr.error(
                  'error in doing payment, you can retry from orders section'
                );
                subscription.unsubscribe();
              },







            })


         
        },
        error:err=>{
          console.log(err)
        }
       
       })
    // ***************************
  },
  error:err=>{
    console.log(err)
  }
 })
  }


}
