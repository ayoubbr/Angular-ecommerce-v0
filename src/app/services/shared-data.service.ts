import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root"
})
export class SharedDataService {
  constructor(private productService: ProductService) {}

  private moneyCountKey = "moneyCount";
  private orderCountKey = "orderCount"; // Key for storing the moneyCount value in localStorage

  setMoneyCount(value: number) {
    localStorage.setItem(this.moneyCountKey, String(value));
  }

  getMoneyCount(): number {
    const moneyCount = localStorage.getItem(this.moneyCountKey);
    return moneyCount ? Number(moneyCount) : 0;
  }

  setOrderCount(value: number) {
    localStorage.setItem(this.orderCountKey, String(value));
  }

  getOrderCount(): number {
    const orderCount = localStorage.getItem(this.orderCountKey);
    return orderCount ? Number(orderCount) : 0;
  }

  fetchDashboardData() {
    this.productService.getAllOrderDetails('all').subscribe(
      (resp) => {
        let moneyCount = 0;
        resp.forEach((element) => {
          moneyCount += element.orderAmount;
        });

        this.setMoneyCount(moneyCount);
      },
      (err) => {}
    );
  }
}
