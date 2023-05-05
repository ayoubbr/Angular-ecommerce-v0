import { Product } from "./../_model/product.model";
import { ImageProcessingService } from "./../image-processing.service";
import { ShowProductImagesDialogComponent } from "./../show-product-images-dialog/show-product-images-dialog.component";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../_services/product.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-show-product-details",
  templateUrl: "./show-product-details.component.html",
  styleUrls: ["./show-product-details.component.css"]
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails: Product[] = [];
  // productDetails = [];
  displayedColumns: string[] = [
    "Id",
    "Product Name",
    "description",
    "Product Discounted Price",
    "Product Actual Price",
    "Images",
    "Edit",
    "Delete"
  ];

  pageNumber: number = 0;
  showTable = false;
  showLoadButton = false;
  constructor(
    private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.showTable = false;
    this.productService
      .getAllProducts(this.pageNumber)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (resp: Product[]) => {
          resp.forEach((p) => {
            this.productDetails.push(p);
          });
          this.showTable = true;
          if (resp.length == 12) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  deleteProduct(productId) {
    console.log(productId);
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.getAllProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      minHeight: "200px",
      minWidth: "700px"
    });
  }

  editProductDetails(productId) {
    console.log(productId);
    this.router.navigate(["/addNewProduct", { productId: productId }]);
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }
}
