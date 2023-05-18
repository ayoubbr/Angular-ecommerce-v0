import { FileHandle } from "../../model/file-handle.model";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../model/product.model";
import { NgForm } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { HttpErrorResponse } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

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
  fileInputError = true;

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
    if (!this.isNewProduct) {
      this.fileInputError = false;
    }
  }

  addProduct(productForm: NgForm) {
    if (productForm.valid) {
      const productFormData = this.prepareFormData(this.product);
      this.productService.addProduct(productFormData).subscribe(
        (response: Product) => {
          if (!this.isNewProduct) {
            this.router.navigate(["/admin/showProductDetails"]);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Product updated successfuly!",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            productForm.reset();
            this.clearFormErrors(productForm);
            this.product.productImages = [];
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Product added successfuly!",
              showConfirmButton: false,
              timer: 1500
            });
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Form is Invalid"
          });
        }
      );
    } else {
      console.log("Form is invalid");
      productForm.form.markAllAsTouched();
    }
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
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileInputError = false;

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      };

      this.product.productImages.push(fileHandle);
    } else {
      this.fileInputError = true;
    }
  }

  removeImage(i: number) {
    this.product.productImages.splice(i, 1);
    if (this.product.productImages.length === 0) {
      this.fileInputError = true;
    }
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }

  clear(productForm: NgForm) {
    productForm.reset();
    this.clearFormErrors(productForm);
  }

  clearFormErrors(productForm: NgForm) {
    Object.keys(productForm.controls).forEach((key: string) => {
      productForm.controls[key].setErrors(null);
    });
  }
}
