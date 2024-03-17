import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cartitem } from '../../../models/Cart.model';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cartitem?:cartitem

 @Output() itemincreaseQuantityevent= new EventEmitter<cartitem>;

 @Output() itemdecreasequantityevent= new EventEmitter<cartitem>;

 @Output() itemdelete = new EventEmitter<cartitem>;
  constructor(public productservice:ProductService){}

  increaseQuantity(cartitem:cartitem){
   this.itemincreaseQuantityevent.emit(cartitem)
}

decearseQuantity(cartitem:cartitem){
   this.itemdecreasequantityevent.emit(cartitem)
}
deleteproduct(cartitem:cartitem){
     this.itemdelete.emit(cartitem)
}
}
