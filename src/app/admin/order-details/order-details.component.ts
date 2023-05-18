import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { FormControl } from "@angular/forms";
import Swal from "sweetalert2";
import { SharedDataService } from "src/app/services/shared-data.service";

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
  constructor(
    private productService: ProductService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(status: string) {
    this.productService.getAllOrderDetails(status).subscribe(
      (resp) => {
        this.dataSource = resp;
        let moneyCount = 0;
        let orderCount = 0;
        this.dataSource.forEach((element) => {
          moneyCount += element.orderAmount;
        });
        orderCount = resp.length;
        this.sharedDataService.setMoneyCount(moneyCount);
        this.sharedDataService.setOrderCount(orderCount);
      },
      (err) => {}
    );
  }

  markAsDelivered(orderId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Submitted!",
          "This product has been made as delivered.",
          "success"
        );
        this.productService.markAsDelivered(orderId).subscribe(
          (resp) => {
            this.getAllOrderDetailsForAdmin(this.status);
          },
          (err) => {}
        );
      }
    });
  }
}
