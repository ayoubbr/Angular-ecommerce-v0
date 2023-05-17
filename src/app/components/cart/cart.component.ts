import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Do you want to delete item from cart?",
      showDenyButton: true,
      confirmButtonText: "Delete Item",
      denyButtonText: `Don't Delete`
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteCartItem(cartId).subscribe(
          (resp) => {
            this.getCartDetails();
          },
          (err) => {
            console.log(err);
          }
        );
        Swal.fire("Done!", "", "success");
      }
    });
  }
}
