import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { MyOrderDetails } from "../../model/order.model";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent implements OnInit {
  constructor(private productService: ProductService) {}
  displayedColumns: string[] = [
    "index",
    "name",
    "address",
    "contact No.",
    "amount",
    "status"
  ];
  // myOrderDetails: MyOrderDetails[] = [];
  myOrderDetails: MyOrderDetails[] = [];
  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.productService.getOrderDetails().subscribe(
      (resp: MyOrderDetails[]) => {
        console.log(resp);
        this.myOrderDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
