import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../model/product.model";
import { ProductService } from "../../services/product.service";
import Swal from "sweetalert2";

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
    window.scrollTo(0, 0);
    this.product = this.activatedRoute.snapshot.data["product"];
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
        if (resp == null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Product already in your cart!"
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added successfuly to you cart!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
