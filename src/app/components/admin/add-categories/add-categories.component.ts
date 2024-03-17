import { Component } from '@angular/core';
import { Category } from '../../../models/Category.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryserviceService } from '../../../service/categoryservice.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent {
   category=  new Category("","","" ,"");

   constructor(private toste:ToastrService,private categoryservie:CategoryserviceService){}
   categoryformsubmit(event:SubmitEvent){


     if(this.category.title.trim()===''){

       this.toste.warning("title is must")
     }
     if(this.category.coverimage.trim()===''){

      this.toste.warning("cover image  is must")
    }

    if(this.category.discription.trim()===''){

      this.toste.warning("discription is must")
    }



       this.categoryservie.createcategory(this.category).subscribe({

        next:(value)=>{
          console.log("category add cxusss")
          this.toste.success("category add sucessfully ");
        this.category=  new Category("","","" ,"");

        },
        error:(err)=>{
  console.log(err)
  this.toste.error("categroy not added ")
        }
       })
 


   }
     
}

