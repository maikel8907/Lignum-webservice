import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input()message: string;
  @Input()deviceName: string;


  constructor() {
    this.deviceName = 'SM-T110';
    this.message = `Welcome to ${ this.deviceName } Wallet Setup! Setting up your ${ this.deviceName } will take only a few minutes.
    When you’re done, you can start using your ${ this.deviceName } wallet`;
  }

  ngOnInit() {
  }
}
