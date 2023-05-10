import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../model/product.model";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-product-view-details",
  templateUrl: "./product-view-details.component.html",
  styleUrls: ["./product-view-details.component.css"]
})
export class ProductViewDetailsComponent implements OnInit {
  product: Product;
  selectedProductIndex = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data["product"];

    console.log(this.product);
  }

  changeIndex(index) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId) {
    this.router.navigate([
      "/buyProduct",
      {
        isSingleProductCheckout: true,
        id: productId
      }
    ]);
  }

  addToCart(productId) {
    this.productService.addToCart(productId).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}