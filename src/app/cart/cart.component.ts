import { Component, OnInit } from "@angular/core";
import { ProductService } from "../_services/product.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ["Name", "Description", "Price", "Discounted Price"];

  // cartDetails: any[] = [];
  cartDetails: any[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (resp: any[]) => {
        console.log(resp);
        this.cartDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
