import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { categorypaginatedresponse } from '../../../models/Category.model';
import { Product, productresponse } from '../../../models/Product.model';

@Component({
  selector: 'app-store-categories',
  templateUrl: './store-categories.component.html',
  styleUrl: './store-categories.component.css'
})
export class StoreCategoriesComponent {

   categoryid?:string
   categorytitle?:string
   productresponse?:productresponse
   loading=false;
   pagenumber=0;
   constructor(private activateroute: ActivatedRoute ,private title :Title,private productservice:ProductService){
      
     activateroute.paramMap.subscribe((param)=>{
      this.categoryid=param.get('categoryid') as string
      this.categorytitle=param.get('categorytitle') as string
      this.loadproductofcategory(this.categoryid)
     })
   }



   loadproductofcategory(
    categoryid:String,
    pagenumber: number = 0,
     pagesize: number = 10,
      sortby: string = 'title',
       sortdir: string = 'asc'){

        this.productservice.getproductofcategory(categoryid,pagenumber,pagesize,sortby,sortdir).subscribe({
   
          next:data=>{
           
            if(pagenumber==0){
              this.productresponse=data;
            console.log(this.productresponse)
            }else{
              this.productresponse={
                ...data,
                content:[
                  ...(this.productresponse?.content as Product[]),
                  ...data.content,
                ],
              }
            }
  
          },
          error:err=>{
            console.log(err)
          }
        })

   }
   productscrolled(event:any){
    if(this.loading || this.productresponse?.lastpage){
      return
     }else{
      this.pagenumber +=1
      this.loadproductofcategory(this.categoryid as string ,this.pagenumber)
     }
   }
 

}
