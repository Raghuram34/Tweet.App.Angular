import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  @Input() allTweets: ITweet[] = [];

  constructor(private userService: UserService, 
    private tweetService: TweetService, 
    private route: ActivatedRoute) { 
      this.readTweets();
  }

  ngOnInit(): void {
    
  }

  ngDoCheck() {
    this.readTweets();
  }

  readTweets() {
    this.allTweets = this.route.snapshot.data['tweets'];
  }

  trackTweet(index: number, tweet: any) {
    return tweet.id;
  }

}
