import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cartDetails: any[] = [];
  productDetails = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (resp: any[]) => {
        this.cartDetails = resp;
      },
      (err) => {}
    );
  }

  checkout() {
    this.router.navigate([
      "buyProduct",
      { isSingleProductCheckout: false, id: 0 }
    ]);
  }

  delete(cartId) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        this.getCartDetails();
      },
      (err) => {}
    );
  }
}
