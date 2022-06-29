import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  private toastMessage$: ReplaySubject<IToastMessageObject> = new ReplaySubject<IToastMessageObject>(1);
  constructor() { }

  createToastMessage(message: string, type: any = "") {
    const newToastMessageInfo: IToastMessageObject = {
      message: message,
      type: type
    };
    this.toastMessage$.next(newToastMessageInfo);
  }

  getToastMessage(): ReplaySubject<IToastMessageObject> {
    return this.toastMessage$;
  }
}

export interface IToastMessageObject {
  message: string;
  type: string;
}
