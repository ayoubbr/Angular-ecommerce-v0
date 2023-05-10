import { ProductViewDetailsComponent } from "./components/product-view-details/product-view-details.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { ForbiddenComponent } from "./components/forbidden/forbidden.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { UserComponent } from "./components/user/user.component";
import { AuthGuard } from "./auth/auth.guard";
import { AddNewProductComponent } from "./admin/add-new-product/add-new-product.component";
import { ShowProductDetailsComponent } from "./admin/show-product-details/show-product-details.component";
import { ProductResolveService } from "./services/product-resolve.service";
import { BuyProductComponent } from "./components/buy-product/buy-product.component";
import { BuyProductResolverService } from "./services/buy-product-resolver.service";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { RegisterComponent } from "./components/register/register.component";
import { CartComponent } from "./components/cart/cart.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { OrderDetailsComponent } from "./admin/order-details/order-details.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] }
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] }
  },
  { path: "login", component: LoginComponent },
  { path: "forbidden", component: ForbiddenComponent },
  {
    path: "addNewProduct",
    component: AddNewProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
    resolve: {
      product: ProductResolveService
    }
  },
  {
    path: "showProductDetails",
    component: ShowProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] }
  },
  {
    path: "productViewDetails",
    component: ProductViewDetailsComponent,
    resolve: { product: ProductResolveService }
  },
  {
    path: "buyProduct",
    component: BuyProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] },
    resolve: {
      productDetails: BuyProductResolverService
    }
  },
  {
    path: "orderConfirm",
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] }
  },
  {
    path: "myOrders",
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] }
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] }
  },
  {
    path: "orderInformation",
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
