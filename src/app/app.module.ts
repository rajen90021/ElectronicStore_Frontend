import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { CustomNavbarComponent } from './components/common/custom-navbar/custom-navbar.component';
import { AdminNavbarComponent } from './components/common/admin-navbar/admin-navbar.component';
import { CategoriesComponent } from './components/common/categories/categories.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { authreducer } from './store/auth/auth.reducer';
import { DasboardComponent } from './components/user/dasboard/dasboard.component';
import { AdmindasboardComponent } from './components/admin/admindasboard/admindasboard.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { ViewProductComponent } from './components/admin/view-product/view-product.component';
import { AddCategoriesComponent } from './components/admin/add-categories/add-categories.component';
import { ViewCategoriesComponent } from './components/admin/view-categories/view-categories.component';
import { ViewOrderComponent } from './components/admin/view-order/view-order.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import { jwtinterceptor } from './service/jwtinterceptor';
import { SingleCategoriesViewComponent } from './components/common/single-categories-view/single-categories-view.component';
import { categortreducer } from './store/category/category.reducer';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserComponent } from './components/pages/user/user.component';
import { UserViewComponent } from './components/common/user-view/user-view.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FeedbackComponent } from './components/admin/feedback/feedback.component';
import { StoreComponent } from './components/pages/store/store.component';
import { SingleProductCardComponent } from './components/common/single-product-card/single-product-card.component';
import { CategoryViewComponent } from './components/common/category-view/category-view.component';
import { StoreCategoriesComponent } from './components/pages/store-categories/store-categories.component';
import { ViewProducttComponent } from './components/pages/view-productt/view-productt.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CartItemComponent } from './components/common/cart-item/cart-item.component';
import { cartreducer } from './store/cart/cart.reducer';
import { ViewOrderCardComponent } from './components/admin/view-order-card/view-order-card.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';
import { SocialLoginModule,SocialAuthServiceConfig, GoogleLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    FeatureComponent,
    CustomNavbarComponent,
    AdminNavbarComponent,
    CategoriesComponent,
    DasboardComponent,
    AdmindasboardComponent,
    AdminhomeComponent,
    AddProductComponent,
    ViewProductComponent,
    AddCategoriesComponent,
    ViewCategoriesComponent,
    ViewOrderComponent,
    ViewUsersComponent,
    SingleCategoriesViewComponent,
    UserComponent,
    UserViewComponent,
    FeedbackComponent,
    StoreComponent,
    SingleProductCardComponent,
    CategoryViewComponent,
    StoreCategoriesComponent,
    ViewProducttComponent,
    CartComponent,
    CartItemComponent,
    ViewOrderCardComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SocialLoginModule,

    GoogleSigninButtonModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot({}),
  
    StoreModule.forRoot({
      auth:authreducer,
      cat:categortreducer,
      cart:cartreducer
    }),
    BrowserAnimationsModule,
    InfiniteScrollModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    
    
    ToastrModule.forRoot({progressBar:true}) // ToastrModule added
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:jwtinterceptor,
      multi:true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1047729904572-gsc5f1ormtk618i1j49tvp15hp0j0au9.apps.googleusercontent.com'
            )
          },
         
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
  
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
