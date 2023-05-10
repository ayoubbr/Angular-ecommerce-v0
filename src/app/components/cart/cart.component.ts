import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    "Name",
    "Description",
    "Price",
    "Discounted Price",
    "Action"
  ];
  cartDetails: any[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (resp: any[]) => {
        this.cartDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkout() {
    this.router.navigate([
      "buyProduct",
      { isSingleProductCheckout: false, id: 0 }
    ]);
    // this.productService.getProductDetails(false, 0).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  delete(cartId) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        this.getCartDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
