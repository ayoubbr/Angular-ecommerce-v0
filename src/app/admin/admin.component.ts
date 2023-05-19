import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthService } from "../services/user-auth.service";
import { UserService } from "../services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    Swal.fire({
      title: "Are you sure",
      text: "You wanna log out ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Loging out!", "Your are redirected to home page", "success");
        this.userAuthService.clear();
        this.router.navigate(["/"]);
      }
    });
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }
}
