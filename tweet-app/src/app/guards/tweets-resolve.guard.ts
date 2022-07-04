import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastMessageService } from '../services/toast-message.service';
import { TweetService } from '../services/tweet.service';

@Injectable({
  providedIn: 'root'
})
export class TweetsResolveGuard implements Resolve<any> {

  constructor(private tweetService: TweetService, 
    private toastService: ToastMessageService) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    if(route.routeConfig?.path?.includes('view-tweets')) {
      return this.tweetService.sendRequestForTweetsByUserId(route.params["id"]);
    }
    else {
      return this.tweetService.sendRequestForAllTweets();
    }
  }
  
}
