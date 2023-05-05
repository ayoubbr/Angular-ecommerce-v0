import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../_services/user.service";
import { log } from "console";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register(registerForm: NgForm) {
    this.userService.register(registerForm.value).subscribe(
      (resp) => {
        this.router.navigate(["/login"]);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(registerForm.value);
  }
}
