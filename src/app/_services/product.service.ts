import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../_model/product.model";
import { OrderDetails } from "../_model/order-details.model";
import { MyOrderDetails } from "../_model/order.model";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public addProduct(product: FormData) {
    return this.http.post<Product>(
      "http://localhost:9090/addNewProduct",
      product
    );
  }

  public getAllProducts(pageNumber, searchKeyword: string = "") {
    return this.http.get<Product[]>(
      "http://localhost:9090/getAllProducts?pageNumber=" +
        pageNumber +
        "&searchKey=" +
        searchKeyword
    );
  }

  public getProductDetailsById(productId) {
    return this.http.get<Product>(
      "http://localhost:9090/getProductDetailsById/" + productId
    );
  }

  public deleteProduct(productId: number) {
    return this.http.delete(
      "http://localhost:9090/deleteProductDetails/" + productId
    );
  }

  public getProductDetails(isSingleProductCheckout, productId) {
    return this.http.get<Product[]>(
      "http://localhost:9090/getProductDetails/" +
        isSingleProductCheckout +
        "/" +
        productId
    );
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout) {
    return this.http.post(
      "http://localhost:9090/placeOrder/" + isCartCheckout,
      orderDetails
    );
  }

  public addToCart(productId) {
    return this.http.get("http://localhost:9090/addToCart/" + productId);
  }

  public getCartDetails() {
    return this.http.get("http://localhost:9090/getCartDetails");
  }

  public deleteCartItem(cartId: number) {
    return this.http.delete("http://localhost:9090/deleteCartItem/" + cartId);
  }

  public getOrderDetails(): Observable<MyOrderDetails[]> {
    return this.http.get<MyOrderDetails[]>(
      "http://localhost:9090/getOrderDetails"
    );
  }
}
