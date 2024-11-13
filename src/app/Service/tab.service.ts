import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private activeTab = 1; // Default active tab

  setActiveTab(tabIndex: number) {
    this.activeTab = tabIndex;
  }

  getActiveTab(): number {
    return this.activeTab;
  }
}
