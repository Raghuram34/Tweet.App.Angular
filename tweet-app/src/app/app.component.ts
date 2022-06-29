import { Component } from '@angular/core';
import { LoadingOverlayService } from './services/loading-overlay.service';
import { ToastMessageService } from './services/toast-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'twitter-app';
  showOverlay: boolean = false;

  constructor(private overlayService: LoadingOverlayService,
    private toastMessageService: ToastMessageService) {

    // Listen to show overlay
    overlayService.getOverlay().subscribe(flag => this.showOverlay = flag);
  }
}
