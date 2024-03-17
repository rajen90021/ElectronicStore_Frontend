import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/Category.model';
import { CategoryserviceService } from '../../../service/categoryservice.service';
import { Store } from '@ngrx/store';
import { addcategorydata } from '../../../store/category/category.action';
import { Product } from '../../../models/Product.model';
import { ProductService } from '../../../service/product.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
 
  categories:Category[]=[];
   product=  new Product();
    imagedata: ImageData = {
    previewFileUrl: '',
    files: undefined // You can set it to null initially or leave it empty depending on your use case
};
  
  constructor(private tost:ToastrService,private productservice:ProductService ,private catservice:CategoryserviceService,private catstore:Store<{cat:Category[]}>){}
  ngOnInit(): void { 
      

     this.catstore.select('cat').subscribe({
      next:catdata=>{
        if(catdata.length>0){
 console.log("categorty alreradt there ")
  
         this.categories=catdata;        
        }else{
          console.log("no category load from server")
          this.catservice.getallcategories().subscribe({
            next:(data)=>{
    
                 this.categories=data.content;
                 this.catstore.dispatch(addcategorydata({categoriess:this.categories}))
            }
          })
        }
      }
     })
      
  }

  comparefn(value:any,option:any){
    return value?.categoryid===option?.categoryid
  }

  productsubmited(event:SubmitEvent){

         if(this.product.title.trim()==''){
   this.tost.error("title is required ")
   return
         }
         if(this.product.discription.trim()==''){
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
                                                // console.log(this.product)
                        if(this.product.category.categoryid===''){

            
                        }else{
                          this.productservice.addproductwithcategeory(this.product).subscribe({
                            next:data=>{
                              this.tost.success("product add succesfully ");
                             this.product= new Product()
                            
    this.productservice.addimagetoproduct(data.id,this.imagedata.files!).subscribe({

      next:data=>{
        console.log(data)
        this.tost.success("file upload sucessfully ");

        this.imagedata={
          previewFileUrl:'',
          files:undefined

        }
      },
      error:error=>{
        console.log(error)
        this.tost.error("file not uploaded ")
      }

    })
                              
                            },
                            error:err=>{
                              this.tost.error("error from bakend")
                            }
                           })
                        }
       
  }
  productimageupload(event:any){
    this.imagedata.files = event.target.files![0];
    
  
    console.log(this.imagedata.files);

    if (this.imagedata.files && (this.imagedata.files.type === 'image/png' || this.imagedata.files.type === 'image/jpeg')) {
      // Proceed with image upload
// priview image 

const reader = new FileReader();
reader.onload = (e) => {
    this.imagedata.previewFileUrl = e.target!.result as string;
};
reader.readAsDataURL(this.imagedata.files);

    } else {
      this.tost.error("Only JPEG and PNG images are valid");
    }
  }
    
  }


interface ImageData {
  previewFileUrl: string;
  files: File | undefined;
}
