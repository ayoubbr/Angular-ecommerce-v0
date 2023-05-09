import { Component, OnInit } from "@angular/core";
import { ProductService } from "../_services/product.service";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"]
})
export class OrderDetailsComponent implements OnInit {
  dataSource = [];
  // dataSource = [];
  displayedColumns: string[] = [
    "index",
    "id",
    "product name",
    "name",
    "address",
    "contactno",
    "status",
    "action"
  ];
  pageNumber: number = 0;
  showTable = false;
  showLoadButton = false;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin();
  }

  getAllOrderDetailsForAdmin() {
    this.productService.getAllOrderDetails().subscribe(
      (resp) => {
        this.dataSource = resp;
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  markAsDelivered(orderId) {
    this.productService.markAsDelivered(orderId).subscribe(
      (resp) => {
        console.log(resp);
        this.getAllOrderDetailsForAdmin();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
