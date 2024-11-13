import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admission-application-form',
  templateUrl: './admission-application-form.component.html',
  styleUrls: ['./admission-application-form.component.css']
})
export class AdmissionApplicationFormComponent implements OnInit{
  activeTab: number = 1;
  constructor() {
  }
  ngOnInit() {
  }
  activateTab(tabName: number) {
    this.activeTab = tabName;
  }
}
