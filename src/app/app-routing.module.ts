import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { CategoriesComponent } from './components/common/categories/categories.component';
import { DasboardComponent } from './components/user/dasboard/dasboard.component';
import { normalUserGuard } from './guards/normal-user.guard';
import { AdmindasboardComponent } from './components/admin/admindasboard/admindasboard.component';
import { adminUserGuard } from './guards/admin-user.guard';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { AddCategoriesComponent } from './components/admin/add-categories/add-categories.component';
import { ViewCategoriesComponent } from './components/admin/view-categories/view-categories.component';
import { ViewOrderComponent } from './components/admin/view-order/view-order.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import { UserComponent } from './components/pages/user/user.component';
import { FeedbackComponent } from './components/admin/feedback/feedback.component';
import { StoreComponent } from './components/pages/store/store.component';
import { StoreCategoriesComponent } from './components/pages/store-categories/store-categories.component';

import { ViewProducttComponent } from './components/pages/view-productt/view-productt.component';
import { ViewProductComponent } from './components/admin/view-product/view-product.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';
import { ForgotpasswordpageComponent } from './components/pages/forgotpasswordpage/forgotpasswordpage.component';

const routes: Routes = [
{
 path:"",
 redirectTo:"home",
 pathMatch:"full"
},
{
  path:"*",
  redirectTo:"home",
  pathMatch:"full"
 },

 {
  path:"cart",
  component:CartComponent
   },

{
  path:"home",
  component:HomeComponent,
},
{
path:"store",
component:StoreComponent
},
{
  path:"forgotpasswordpage",
  component:ForgotpasswordpageComponent
  },
{
  path:'store/:categoryid/:categorytitle',
  component:StoreCategoriesComponent
   },

   {

    path:'product/:productid',
    component:ViewProducttComponent
    
   },
{
  path:"about",
  component:AboutComponent,
},

{
    path: "feature",
    component:FeatureComponent,
},
{
  path:"login",
  component:LoginComponent,
}

,
{
  path:"signup",
  component:SignupComponent
},
{
  path:"categories",
  component:CategoriesComponent
},
{
  path:"user",
  component:DasboardComponent,
  title:"userdasbaoadrd",
  canActivate:[normalUserGuard]
},

{
path:"profile",
component:UserComponent,
canActivate:[normalUserGuard]
},

{
  path:"my/orders",
  component:MyOrdersComponent,
  canActivate:[normalUserGuard]
},

{
  path:"admin",
  component:AdmindasboardComponent,
  title:"admin_dasboard",
  canActivate:[adminUserGuard],
  children:[

    {
   path:"home",
   component:AdminhomeComponent

    },
    // {
    //   path:"login",
    //   component:LoginComponent
    // },


   
    {
      path:"feedback",
      component:FeedbackComponent
    },
    {
      path:"add-product",
      component:AddProductComponent
   
       },
       {
        path:"view-product",
        component:ViewProductComponent
     
         },

         {
          path:"add-categories",
          component:AddCategoriesComponent
       
           },
           {
            path:"view-categories",
            component:ViewCategoriesComponent
         
             },  

             {
              path:"orders",
              component:ViewOrderComponent
           
               },

               {
                path:"users",
                component:ViewUsersComponent
             
                 },
                 
  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
