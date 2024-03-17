import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryserviceService } from '../../../service/categoryservice.service';
import { Category } from '../../../models/Category.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit {


  categories: Category[] =[];
  selectedcategory?:Category;
  updateview=false;
  constructor(private categoryservie:CategoryserviceService,private modalService:NgbModal,private tost:ToastrService){}
  ngOnInit(): void {
   

       this.categoryservie.getallcategories().subscribe({
        next:(data)=>{
            
          this.categories=data.content;
        }
       })
  }

  open(content: TemplateRef<any>,category:Category) {
    this.selectedcategory={...category}
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result
    .then((result) => {
      // Handle the result here
    })
    .catch((error) => {
      // Handle errors here
    })
    .finally(() => {
      this.updateview = false;
    });
	}

  deletecategory(cateid: any) {
    console.log(cateid);
  
    // Trigger SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, proceed with the API call
        this.categoryservie.deleteCategory(cateid).subscribe({
          next: data => {
            console.log(data);
            this.tost.success("Category deleted successfully");
            this.modalService.dismissAll();
  
            // Remove the deleted category from the array
            this.categories = this.categories.filter(cat => cat.categoryid !== this.selectedcategory?.categoryid);
          },
          error: err => {
            console.log(err);
            this.tost.error("Category not deleted");
          }
        });
      }
    });
  }

  updatetoggleview(){
    this.updateview=!this.updateview
  }

  updateselectedcategoryy(){
     this.categoryservie.updateselectedcategory(this.selectedcategory!).subscribe({

      next:data=>{
  this.tost.success("category updated succesfully ");
  this.categories=this.categories.map((cat)=>{
    if(cat.categoryid==this.selectedcategory?.categoryid){
      cat.title=data.title,
      cat.discription=data.discription,
      cat.coverimage=data.coverimage
      return cat;
    }
    return cat;
  })
      },
      error:err=>{
   console.log(err)
   this.tost.error("error in updatedintg ")
      }
     })
  }
}
