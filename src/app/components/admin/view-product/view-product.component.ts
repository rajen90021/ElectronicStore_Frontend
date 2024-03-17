import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product, productresponse } from '../../../models/Product.model';
import { ProductService } from '../../../service/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CategoryserviceService } from '../../../service/categoryservice.service';
import { Category } from '../../../models/Category.model';
import { Store } from '@ngrx/store';
import { addcategorydata } from '../../../store/category/category.action';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {
 
   productresponse?:productresponse
   product?:Product
   update=false;
   categories:Category[]=[]
  
 

   constructor(private catstore:Store<{cat:Category[]}>, private catservice:CategoryserviceService ,public productservice:ProductService,private tost:ToastrService,private modalService:NgbModal){}
  ngOnInit(): void {
    
this.loadproduct(0);
  }

  loadproduct(pagenumber = 0){
    
    this.productservice.getallproduct(pagenumber,3,'addeddate','asc').subscribe({
      next:data=>{
        this.productresponse=data;
        console.log(this.productresponse)
       
      }
     })
  }

  pagechange(page:number){
console.log(page)
this.loadproduct(page-1)
  }


  open(content: TemplateRef<any>,product:Product) {
  
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg'}).result.then().catch().finally(()=>{this.update=false})
    this.product=product
   
	}

  // productdelete(productId: any) {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to delete the product ",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
       
  //       // console.log(productId)
  //       this.productservice.deleteproduct(productId).subscribe({
  //         next:deletedata=>{
  //           this.tost.success("product delete successfully")

  //           // this.categories = this.categories.filter(cat => cat.categoryid !== this.selectedcategory?.categoryid);
  //         if(this.productresponse && this.productresponse.content){
  //           this.productresponse.content = this.productresponse.content.filter((p)=>p.id!==this.product?.id)
  //         }

  //         },
  //         error:err=>{
  //           this.tost.error("product not delete ")
  //           console.log(err);
  //         }
  //       })
  //     }
  //   });
  // }


  yesdeleteproduct(productid:any){
 

    this.productservice.deleteproduct(productid).subscribe({
      next:deletedata=>{
        this.tost.success("product delete successfully")

        // this.categories = this.categories.filter(cat => cat.categoryid !== this.selectedcategory?.categoryid);
      if(this.productresponse && this.productresponse.content){
        this.productresponse.content = this.productresponse.content.filter((p)=>p.id!==this.product?.id)
        this.loadproduct(0)
      }

      },
      error:err=>{
        this.tost.error("product not delete ")
        console.log(err);
      }
    })
  }
  loadcategroy(){
    this.catservice.getcategoryfromstore().subscribe({

      next:catagoriesss=>{
        if(catagoriesss.length>0){
  this.categories=catagoriesss
        }else{
              this.catservice.getallcategories().subscribe({
                next:categoryresponse=>{
              this.catstore.dispatch(addcategorydata({categoriess:categoryresponse.content}))

                }
              })
        }
      }
    })
  }
  toggleupdateview(content:any,product:Product){
    this.update=true
   this. product=product
    this.modalService.open(content,{size:"xl"}).result.then().catch().finally(()=>{this.update=false})

  this.loadcategroy();
  
  }
  toogleupdateview1(){
    this.update=!this.update
    this.loadcategroy()
  }

  updatefromsubmit(event:SubmitEvent){

     
     if(this.product!=null){
      if(this.product.title.trim()==''){
        this.tost.error("title is required ")
        return
              }
              if( this.product.discription==null  ||this.product.discription.trim()==''){
               this.tost.error("discription is required ")
               return
                     }
     
                     if(this.product.title.trim()==''){
                       this.tost.error("title is required ")
                       return
                             }
     
                             if(this.product.quantity<=0){
                               this.tost.error("quantity is required ")
                               return
                                     }
                                     if(this.product.price<=0){
                                       this.tost.error("price is required ")
                                       return
                                             }
                                             if(this.product.discount<=0 || parseInt(this.product.discount+'')>parseInt(this.product.price+'')){
                                               this.tost.error("discount is required ")
                                               return
                                                     }


                                                     console.log("submit the fomr ")
            
                                                     

                this.productservice.updateproduct(this.product).subscribe({
                  next:data=>{
                    this.tost.success("product updated succssfully ")
                    this.product=data
                  },
                  error:err=>{
                    this.tost.error("error to updated in backend ")
                    console.log(err);
                  }
                })

     }
  }
  updateproductcategory(){
    if(this.product){
      this.productservice.updatecategoryofproduct(this.product?.id,this.product?.category.categoryid).subscribe({
        next:data=>{
          this.product=data
          this.tost.success("category updated")
        }
      })
    }
  }
  
  comparefn(value:any,option:any){
    return value?.categoryid===option?.categoryid
  }

}
