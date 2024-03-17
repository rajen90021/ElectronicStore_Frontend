import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderResponse, updatorderrequest } from '../../../models/order.model';
import { OrderService } from '../../../service/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { orderRequest, orderstatus, paymentstatus } from '../../../models/order.request.model';
import { ProductService } from '../../../service/product.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth.service';
import { PaymentService } from '../../../service/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent implements OnInit {
  
 @Input() orderresponse?:OrderResponse
  order?:Order

  updateorderrequest?:updatorderrequest

  updatestate=false;
  

  orderstatus=orderstatus
  paymentstatus=paymentstatus
   constructor(public _auth: AuthService,
     private tost:ToastrService,
     public productservice:ProductService,
     private orderserive:OrderService,
     private modalService :NgbModal,
     private _toastr: ToastrService,
     private _payment: PaymentService,

     private route:Router
     ){}
  ngOnInit(): void {
     
     
        this.orderserive.getallorder().subscribe({

          next:(value:OrderResponse)=>{
            this.orderresponse=value;
          },
          error:err=>{
            console.log(err)
          }
        })

        
   }
  

 
   openordermodel(content:any, orderr:Order){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'xl' })
  console.log(orderr)
  
    this.order=orderr;
  
  }
  changestate(){
    this.updatestate = !this.updatestate
  }
  compareFn(value: any, option: any): boolean {
    return value && option && value.orderstatus === option.orderstatus;
  }

  updateFormSubmitted(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.order);
    // call server api to save data
    if (this.order) {
      this.orderserive.updateOrder(this.order).subscribe({
        next: (order) => {
          this.order = order;
          this.tost.success('Order Updated');
          this.updatestate = false;
        },
        error: (error) => {
          console.log(error);
          this.tost.error('Error in updating order'!!);
        },
      });
    }
  }



  payorder(order :Order |undefined){

   

if(order){
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

   this.route.navigate(['/']);
   this.modalService.dismissAll();
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
}































































    
}
}
