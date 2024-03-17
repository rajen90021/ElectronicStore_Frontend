import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order, OrderResponse } from '../../../models/order.model';
import { orderstatus, paymentstatus } from '../../../models/order.request.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-order-card',
  templateUrl: './view-order-card.component.html',
  styleUrl: './view-order-card.component.css'
})
export class ViewOrderCardComponent {
 @Input() order?:Order

 orderstatus=orderstatus
 paymentstatus=paymentstatus

//  @Output() emitordertoparent= new EventEmitter<Order>()

constructor(private modalService:NgbModal){}



//  getorderfromparent(){
//   this.emitordertoparent.emit(this.order)
//  }
 
 
}
