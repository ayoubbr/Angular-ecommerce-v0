import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OrderDetails } from "../../model/order-details.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../model/product.model";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-buy-product",
  templateUrl: "./buy-product.component.html",
  styleUrls: ["./buy-product.component.css"]
})
export class BuyProductComponent implements OnInit {
  productDetails: Product[] = [];
  isSingleProductCheckout: string = "";

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
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get(
      "isSingleProductCheckout"
    );

    this.productDetails.forEach((x) =>
      this.orderDetails.orderProductQuantityList.push({
        productId: x.productId,
        quantity: 1
      })
    );
  }

  placeOrder(orderForm: NgForm) {
    this.productService
      .placeOrder(this.orderDetails, this.isSingleProductCheckout)
      .subscribe(
        (resp) => {
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
