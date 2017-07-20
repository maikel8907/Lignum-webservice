import { Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.css']
})
export class PopupComponent {
  private PopupType = 'FirstTimePopup';

  constructor() {}
}

