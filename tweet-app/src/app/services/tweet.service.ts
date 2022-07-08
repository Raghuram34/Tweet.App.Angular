import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe, ReplaySubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITweet } from '../models/itweet';
import { IReplyTweet } from '../models/itweetreply';
import { IUser } from '../models/iuser';
import { IUserAccount } from '../models/iuseraccount';
import { LoadingOverlayService } from './loading-overlay.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private currentUser!: IUserAccount;
  tweetAPIPath = environment.TweetAPIPath;

  private currentUserTweets$ = new ReplaySubject<ITweet[]>(1);
  private allTweets$ = new ReplaySubject<ITweet[]>(1);

  constructor(
    private userService: UserService, 
    private httpClient: HttpClient, 
    private overlayService: LoadingOverlayService,
    private router: Router) 
  { 
    userService.getCurrentUser().subscribe(user => this.currentUser = user);
    this.sendRequestForAllTweets();
  }

  postTweet(tweet: ITweet): Observable<any> {
    const url = `${this.tweetAPIPath}/add`;
    tweet.user = this.currentUser as IUserAccount;
    return this.httpClient.post(url, tweet);
  }

  listenRequestForAllTweets() {
    const url = `${this.tweetAPIPath}/all`;
    this.overlayService.loadingOverlayShow();  
    this.sendRequestForAllTweets().subscribe(
      (tweets) => this.allTweets$.next(tweets),
      (error) => console.log(error)
    );
  }

  sendRequestForAllTweets() {
    const url = `${this.tweetAPIPath}/all`;
    this.overlayService.loadingOverlayShow();
    return this.httpClient.get<ITweet[]>(url)
      .pipe(finalize(() => this.overlayService.loadingOverlayHide()));
  }

  sendRequestForTweetsByUserId(id: any): Observable<ITweet[]> {
    const url = `${this.tweetAPIPath}/${id}`;
    return this.httpClient.get<ITweet[]>(url)
            .pipe(finalize(() => this.overlayService.loadingOverlayHide()));
  }

  sendRequestForCurrentUserTweets(){
    this.sendRequestForTweetsByUserId(this.currentUser?.id)
      .subscribe(tweets => {
        this.currentUserTweets$.next(tweets);
      },
      (error) => {
        console.log(error);
      });
  }

  getTweetsForCurrentUser(): Observable<ITweet[]> {
    return this.currentUserTweets$;
  }

  getAllTweets(): Observable<ITweet[]> {
    return this.allTweets$;
  }

  refreshTweetServices() {
    this.sendRequestForCurrentUserTweets();
    let currentUrl = this.router.url;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  sendLikeTweetRequest(tweetId: string | undefined) {
    this.overlayService.loadingOverlayShow();
    const url = `${this.tweetAPIPath}/${this.currentUser.id}/like`;
    this.httpClient.patch(url, JSON.stringify(tweetId), { responseType: 'text'})
      .pipe(finalize(() => this.overlayService.loadingOverlayHide()))
      .subscribe(response => 
        { 
          this.refreshTweetServices();
        }
    );
  }

  sendDeleteTweetRequest(tweetId: any) {
    const url = `${this.tweetAPIPath}/${this.currentUser.id}/delete/${tweetId}`;
    this.overlayService.loadingOverlayShow();

    this.httpClient.delete(url)
      .pipe(finalize(() => this.overlayService.loadingOverlayHide()))
      .subscribe(response => 
        { 
          this.refreshTweetServices();
        }
    );
  }

  sendReplyTweetRequest(reply: any, tweetId: any): Observable<any> {
    const tweetReply: IReplyTweet = {
      tweetContent: reply,
      user: this.currentUser as IUserAccount
    };
    this.overlayService.loadingOverlayShow();
    const url = `${this.tweetAPIPath}/${tweetId}/reply`;
    return this.httpClient.patch<any>(url, tweetReply)
            .pipe(finalize(() => this.overlayService.loadingOverlayHide()));
  }
}
