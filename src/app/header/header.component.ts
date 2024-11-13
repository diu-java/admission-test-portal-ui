import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Profile} from "../model/profile";
import {environment} from "../../environment/environment";
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  profile: any = new Profile();
  constructor(private keycloakService: KeycloakService) {
  }
  ngOnInit() {
    this.getProfile();
  }
  openMiniSide() {
    $('.sidebar').toggleClass('mini_sidebar');
    $('.main_content ').toggleClass('full_main_content');
    $('.footer_part ').toggleClass('full_footer');
  }
  sidebarIcon() {
    $('.sidebar').toggleClass('active_sidebar');
  }
  logout() {
    this.keycloakService.logout(environment.sso_logout_url);
  }
  private async getProfile() {
    this.profile = await this.keycloakService.loadUserProfile();
  }
}
