import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"]
})
export class OrderDetailsComponent implements OnInit {
  dataSource = [];
  status: string = "all";
  fontStyleControl = new FormControl("");
  fontStyle?: string;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(status: string) {
    this.productService.getAllOrderDetails(status).subscribe(
      (resp) => {
        this.dataSource = resp;
      },
      (err) => {}
    );
  }

  markAsDelivered(orderId) {
    this.productService.markAsDelivered(orderId).subscribe(
      (resp) => {
        this.getAllOrderDetailsForAdmin(this.status);
      },
      (err) => {}
    );
  }
}
