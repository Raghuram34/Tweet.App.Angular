import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingOverlayService {

  private showOverlay$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  loadingOverlayShow() {
    this.showOverlay$.next(true);
  }

  loadingOverlayHide() {
    this.showOverlay$.next(false);
  }

  getOverlay(): BehaviorSubject<boolean> {
    return this.showOverlay$;
  }
}
