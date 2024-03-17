import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, productresponse } from '../models/Product.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { categorypaginatedresponse } from '../models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }



  getproduct(productid:string){

  return   this.http.get<Product>(`${environment.baseurl}/product/${productid}`)

  }

    addproductwithcategeory(product:Product){


        return this.http.post<Product>(`${environment.baseurl}/categories/${product.category.categoryid}/product`,product);
    }
    addProduct(product: Product): Observable<Product> {
      console.log("productr service ")
      return this.http.post<Product>(`${environment.baseurl}/product`, product);
    }

    addimagetoproduct(productid:string, imagedata:File){

      const formdata =new FormData();
     formdata.append('productimage',imagedata)
         return this.http.post(`${environment.baseurl}/product/image/${productid}`,formdata)
    }


  //  get product of category 

     getproductofcategory(
      categoryid:String,
      pagenumber: number = 0,
       pagesize: number = 10,
        sortby: string = 'title',
         sortdir: string = 'asc'
     ){
    
      return this.http.get<productresponse>(`${environment.baseurl}/categories/${categoryid}/product?pagenumber=${pagenumber}&pagesize=${pagesize}&sortby=${sortby}&sortdir=${sortdir}`)
     }



    // get alll live product 
    getLiveProduct(pagenumber: number = 0, pagesize: number = 10, sortby: string = 'title', sortdir: string = 'asc') {
     
      const url = `${environment.baseurl}/product/live?pagenumber=${pagenumber}&pagesize=${pagesize}&sortby=${sortby}&sortdir=${sortdir}`;
  
 
      return this.http.get<productresponse>(url);
    }



    // get all product 
    getallproduct(pagenumber: number = 0, pagesize: number = 10, sortby: string = 'title', sortdir: string = 'asc') {
   
      const url = `${environment.baseurl}/product?pagenumber=${pagenumber}&pagesize=${pagesize}&sortby=${sortby}&sortdir=${sortdir}`;
  
  
      return this.http.get<productresponse>(url);
    }
    getporudctimageurl(productid:string){
      // console.log(productid)
      // console.log("getiing multipal value ")
 return  `${environment.baseurl}/product/image/${productid}`
    }


    deleteproduct(productid:any){

         return this.http.delete(`${environment.baseurl}/product/${productid}`)
    }

    updateproduct(product:Product){
       return this.http.put<Product>(`${environment.baseurl}/product/${product.id}`,product)
    }
    updatecategoryofproduct(productid:String,categoryid:String){

      return this.http.put<Product>(`${environment.baseurl}/categories/${categoryid}/product/${productid}`,null)
    }
}
