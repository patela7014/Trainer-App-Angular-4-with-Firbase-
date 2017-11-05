import {Component, ViewContainerRef} from '@angular/core';
import { Overlay } from 'angular2-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(overlay: Overlay, viewContainer: ViewContainerRef) {
    overlay.defaultViewContainer = viewContainer;
  }
}
