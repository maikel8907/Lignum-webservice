import { Component, OnInit, AfterContentInit, ElementRef } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.css']
})
export class LoadingComponent implements OnInit, AfterContentInit {
  private isLoaded: boolean;
  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.isLoaded = false;
    this.elementRef = elementRef;
  }

  ngOnInit() {}

  ngAfterContentInit() {
    const { elementRef } = this;
    const loadingElement = elementRef.nativeElement.childNodes[0];

    if (loadingElement) {
     loadingElement.style.height = `${window.innerHeight}px`
    }
  }
}
