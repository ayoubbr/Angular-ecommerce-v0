import { FileHandle } from "../../model/file-handle.model";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../model/product.model";
import { NgForm } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { HttpErrorResponse } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-new-product",
  templateUrl: "./add-new-product.component.html",
  styleUrls: ["./add-new-product.component.css"]
})
export class AddNewProductComponent implements OnInit {
  product: Product = {
    productId: null,
    productName: "",
    productDescription: "",
    productDiscountedPrice: null,
    productActualPrice: null,
    productImages: []
  };
  isNewProduct = true;

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activaedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product = this.activaedRoute.snapshot.data["product"];
    if (this.product && this.product.productId) {
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);
    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        if (!this.isNewProduct) {
          this.router.navigate(["/admin/showProductDetails"]);
        }
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    for (let i = 0; i < product.productImages.length; i++) {
      formData.append(
        "imageFile",
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      };

      this.product.productImages.push(fileHandle);
    }
  }

  removeImage(i: number) {
    this.product.productImages.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }

  clear(productForm: NgForm) {
    productForm.reset();
  }
}
