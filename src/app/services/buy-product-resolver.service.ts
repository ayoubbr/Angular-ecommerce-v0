import { ImageProcessingService } from "./image-processing.service";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { Product } from "../model/product.model";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root"
})
export class BuyProductResolverService implements Resolve<Product[]> {
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get(
      "isSingleProductCheckout"
    );
    return this.productService
      .getProductDetails(isSingleProductCheckout, id)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      );
  }
}
