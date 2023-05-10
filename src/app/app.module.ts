import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./components/user/user.component";
import { LoginComponent } from "./components/login/login.component";
import { HeaderComponent } from "./components/header/header.component";
import { ForbiddenComponent } from "./components/forbidden/forbidden.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { UserService } from "./services/user.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AddNewProductComponent } from "./admin/add-new-product/add-new-product.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { DragDirective } from "./services/drag.directive";
import { ShowProductDetailsComponent } from "./admin/show-product-details/show-product-details.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { ShowProductImagesDialogComponent } from "./components/show-product-images-dialog/show-product-images-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { ProductViewDetailsComponent } from "./components/product-view-details/product-view-details.component";
import { BuyProductComponent } from "./components/buy-product/buy-product.component";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { RegisterComponent } from "./components/register/register.component";
import { CartComponent } from "./components/cart/cart.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { OrderDetailsComponent } from "./admin/order-details/order-details.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AddNewProductComponent,
    DragDirective,
    ShowProductDetailsComponent,
    ShowProductImagesDialogComponent,
    ProductViewDetailsComponent,
    BuyProductComponent,
    OrderConfirmationComponent,
    RegisterComponent,
    CartComponent,
    MyOrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    MatButtonToggleModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
