import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { SharedDataService } from "src/app/services/shared-data.service";
import { UserDetailsServiceService } from "src/app/services/user-details-service.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private userDetailsService: UserDetailsServiceService,
    private sharedDataService: SharedDataService,
    private productService: ProductService
  ) {}

  userDetails;
  moneyCount: number = 0;
  orderCount: number = 0;
  orderPlaced: number = 0;
  orderDelivered: number = 0;

  ngOnInit(): void {
    this.userDetails = this.userDetailsService.getUserDetails();
    this.getAllOrderDetailsForAdmin("all");
  }

  getAllOrderDetailsForAdmin(status: string) {
    this.productService.getAllOrderDetails(status).subscribe(
      (resp) => {
        resp.forEach((element) => {
          this.moneyCount = this.moneyCount + element.orderAmount;
          if (element.orderStatus === "Placed") {
            this.orderPlaced++;
          } else if (element.orderStatus === "Delivered") {
            this.orderDelivered++;
          }
        });
        this.orderCount = resp.length;
      },
      (err) => {}
    );
  }
}
