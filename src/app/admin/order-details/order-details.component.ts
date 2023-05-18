import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { FormControl } from "@angular/forms";
import Swal from "sweetalert2";

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
        Swal.fire("Submitted!", "This product has been made as delivered.", "success");
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
