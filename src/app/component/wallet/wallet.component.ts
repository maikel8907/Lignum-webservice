import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-wallet',
  templateUrl: 'wallet.component.html',
  styleUrls: ['wallet.component.css']
})
export class WalletComponent implements OnInit {
  private deviceName: string;
  private devicePin: string;
  private isReady: boolean;

  constructor() {
    this.deviceName = '';
    this.devicePin = '';
    this.isReady = false;
  }

  ngOnInit() {}
}
