import { Component, OnInit } from '@angular/core';
import { Product, productresponse } from '../../../models/Product.model';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {

  productresponse?:productresponse
  loading=false;
  pagenumber=0;

   constructor(public productservice:ProductService){}


  ngOnInit(): void {
     this.loadproduct(0)
  }
  loadproduct(pagenumber=0,pagesize=10,sortby='title',sortdir='asc'){
    
    this.productservice.getLiveProduct(pagenumber,pagesize,sortby,sortdir).subscribe({
      next:product=>{
        if(pagenumber==0){
          this.productresponse=product;
        console.log(this.productresponse)
        }else{
          this.productresponse={
            ...product,
            content:[
              ...(this.productresponse?.content as Product[]),
              ...product.content,
            ],
          }
        }
      }
     })
  }
  productscrolled(event:any){


     if(this.loading || this.productresponse?.lastpage){
      return
     }else{
      this.pagenumber +=1
      this.loadproduct(this.pagenumber)
     }
  }
}
