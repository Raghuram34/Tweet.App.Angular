import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ITweet } from 'src/app/models/itweet';
import { TweetService } from 'src/app/services/tweet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-tweets',
  templateUrl: './all-tweets.component.html',
  styleUrls: ['./all-tweets.component.less']
})
export class AllTweetsComponent implements OnInit {

  allTweets: ITweet[] = [];

  constructor(private userService: UserService, private tweetService: TweetService) { 

    tweetService.getAllTweets()
      .pipe(filter(tweets => tweets != null))
      .subscribe(tweets => { 
        this.allTweets = tweets; 
      });
  }

  ngOnInit(): void {
    
  }

  trackTweet(index: number, tweet: any) {
    return tweet.id;
  }

}
