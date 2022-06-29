import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ITweet } from 'src/app/models/itweet';
import { TweetService } from 'src/app/services/tweet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-tweets',
  templateUrl: './my-tweets.component.html',
  styleUrls: ['./my-tweets.component.less']
})
export class MyTweetsComponent implements OnInit {
  myTweets: ITweet[] = [];

  constructor(private userService: UserService, private tweetService: TweetService) { 
    this.userService.isUserLoggedIn()
      .subscribe(flag => {
        if(flag) {
          tweetService.sendRequestForCurrentUserTweets();
        }
      });

    tweetService.getTweetsForCurrentUser()
      .pipe(filter(tweets => tweets != null))
      .subscribe(tweets => this.myTweets = tweets);
  }

  ngOnInit(): void {
    
  }

  trackTweet(index: number, tweet: any) {
    return tweet.id;
  }
}
