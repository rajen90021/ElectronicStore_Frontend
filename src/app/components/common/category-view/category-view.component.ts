import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from '../../../models/Category.model';
import { CategoryserviceService } from '../../../service/categoryservice.service';
import { addcategorydata } from '../../../store/category/category.action';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrl: './category-view.component.css'
})
export class CategoryViewComponent  implements OnInit{
 
 
  constructor(private catstore:Store<{cat:Category[]}>,private catservice:CategoryserviceService){}

  categories:Category[]=[]
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

}
