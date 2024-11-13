import {Component, OnInit} from '@angular/core';
import {RoleService} from "../utility/role.service";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private roleService: RoleService,
              private keycloakService: KeycloakService,
              private router: Router) {
  }
  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    if(this.roleService.hasRole('admission-portal-ui')){
      this.router.navigate(['/dashboard']);
    }
  }
  login() {
    this.keycloakService.login();
  }
}
