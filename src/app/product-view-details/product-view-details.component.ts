import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Product } from "../_model/product.model";

@Component({
  selector: "app-product-view-details",
  templateUrl: "./product-view-details.component.html",
  styleUrls: ["./product-view-details.component.css"]
})
export class ProductViewDetailsComponent implements OnInit {
  product: Product;
  selectedProductIndex = 0;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data["product"];

    console.log(this.product);
  }

  changeIndex(index) {
    this.selectedProductIndex = index;
  }
}
