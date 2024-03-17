import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

declare var Razorpay:any

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor( private http:HttpClient) { }


  initiatepayment(orderid:String){
    return this.http.post(`${environment.baseurl}/payments/initiate/${orderid}`,{});
  }


  captureAndVarifyPayment(orderId: string, paymentData: any) {
    return this.http.post(
      `${environment.baseurl}/payments/capture/${orderId}`,
      paymentData
    );
  }

  payWithRazorpay(paymentOption: {
    amount: number;
    razorpayOrderId: string;
    userName: string;
    email: string;
    contact: string;
  }) {
    const subject = new Subject<any>();
   
    const option = {
      key: 'rzp_test_c3j7OsOf8PlEZN', // Enter the Key ID generated from the Dashboard
      amount: paymentOption.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'adukinandu Technologies', //your business name
      description: 'You will receive email after payment',
      image: 'https://substringtechnologies.com/static/img/features-3.png',
      order_id: paymentOption.razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: any) {
        console.log({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentSignature: response.razorpay_signature,
        });
        subject.next({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentSignature: response.razorpay_signature,
        });

      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: paymentOption.userName, //your customer's name
        email: paymentOption.email,
        contact: paymentOption.contact, //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: '',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const pay= new Razorpay(option)

    pay.on('payment.failed', function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
      subject.error(response.error);
    });

    pay.open();

    return subject;
    
  }
}
