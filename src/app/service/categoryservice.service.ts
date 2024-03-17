import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, categorypaginatedresponse } from '../models/Category.model';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { loginresponse } from '../models/loginresponse.model';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {

  constructor(private http:HttpClient,private store :Store<{auth:loginresponse}>,private authserice:AuthService,private catstore:Store<{cat:Category[]}>) { }

  createcategory(category: Category) {
  
        return this.http.post<Category>(`${environment.baseurl}/categories`, category);
      

  }

  getallcategories(){

    return this.http.get<categorypaginatedresponse>(`${environment.baseurl}/categories`);
  }


  deleteCategory(catId: string) {
    return this.http.delete(`${environment.baseurl}/categories/${catId}`);
  }
  updateselectedcategory(category: Category) {
    return this.http.put<Category>(`${environment.baseurl}/categories/${category.categoryid}`, category);
  }
  
  getcategoryfromstore(){
    return this.catstore.select('cat');
  }
  
  }


