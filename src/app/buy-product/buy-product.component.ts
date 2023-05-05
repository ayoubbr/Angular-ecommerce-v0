import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OrderDetails } from "../_model/order-details.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../_model/product.model";
import { ProductService } from "../_services/product.service";

@Component({
  selector: "app-buy-product",
  templateUrl: "./buy-product.component.html",
  styleUrls: ["./buy-product.component.css"]
})
export class BuyProductComponent implements OnInit {
  productDetails: Product[] = [];
  // productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: "",
    fullAddress: "",
    contactNumber: "",
    alternateContactNumber: "",
    orderProductQuantityList: []
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data["productDetails"];
    this.productDetails.forEach((x) =>
      this.orderDetails.orderProductQuantityList.push({
        productId: x.productId,
        quantity: 1
      })
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp) => {
        // console.log(resp);
        // orderForm.reset();
        //  confirming order
        this.router.navigate(["/orderConfirm"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getQuantityForProduct(productId) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQunatity) => productQunatity.productId === productId
    );
    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId, productDiscountedPrice) {
    const quantity = this.getQuantityForProduct(productId);
    return quantity * productDiscountedPrice;
  }

  onQuantityChanged(q, productId) {
    this.orderDetails.orderProductQuantityList.filter(
      (product) => product.productId === productId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach((productQuantity) => {
      const price = this.productDetails.filter(
        (product) => product.productId === productQuantity.productId
      )[0].productDiscountedPrice;
      grandTotal += price * productQuantity.quantity;
    });
    return grandTotal;
  }
}
