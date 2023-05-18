import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserAuthService } from "../../services/user-auth.service";
import { UserService } from "../../services/user.service";
import { UserDetailsServiceService } from "src/app/services/user-details-service.service";
import { SharedDataService } from "src/app/services/shared-data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private userDetailsService: UserDetailsServiceService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        this.userDetailsService.setUserDetails(response.user);

        const role = response.user.role[0].roleName;
        if (role === "Admin") {
          this.router.navigate(["/admin/dashboard"]);
          this.sharedDataService.fetchDashboardData();
        } else {
          this.router.navigate(["/"]);
        }
      },
      (error) => {}
    );
  }

  registerUser() {
    this.router.navigate(["/register"]);
  }
}
