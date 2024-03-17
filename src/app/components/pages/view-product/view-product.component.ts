import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../models/Product.model';
import { Title } from '@angular/platform-browser';




@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
  
})
export class ViewProductComponent {

  productid?:string;

  product?:Product
   constructor(private activateroute:ActivatedRoute,public productserive:ProductService,private title:Title){
    activateroute.params.subscribe((param)=>{
      this.productid=param['productid']
   this.loadproduct();
    })
   }
   loadproduct() {
  if(this.productid){
    this.productserive.getproduct(this.productid).subscribe({
      next:data=>{
           this.product=data
           console.log(this.product)
           this.title.setTitle(data.title)
      }
     })
  }
 
   }
}


