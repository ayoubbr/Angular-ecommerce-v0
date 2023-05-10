import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Product } from "../../model/product.model";
import { FileHandle } from "../../model/file-handle.model";

@Component({
  selector: "app-show-product-images-dialog",
  templateUrl: "./show-product-images-dialog.component.html",
  styleUrls: ["./show-product-images-dialog.component.css"]
})
export class ShowProductImagesDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
