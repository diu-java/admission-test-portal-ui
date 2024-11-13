import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {RoleService} from "./utility/role.service";
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'admission-portal-ui';
  isLoggedIn$!: Observable<boolean>
  loading = true;

  constructor(private roleService: RoleService) {
  }
  ngOnInit() {
    this.authLogin();
  }
  goToTop() {
    $('body,html').animate({ scrollTop: 0 }, 1000);
    return false;
  }
  authLogin() {
    if(this.roleService.hasRole('admission-portal-ui')){
      this.isLoggedIn$ = of(true);
    }else{
      this.isLoggedIn$ = of(false);
    }
  }

}
