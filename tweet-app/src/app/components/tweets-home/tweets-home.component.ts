import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ITweet } from 'src/app/models/itweet';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/shared/constants';
import { TweetService } from './../../services/tweet.service';

@Component({
  selector: 'app-tweets-home',
  templateUrl: './tweets-home.component.html',
  styleUrls: ['./tweets-home.component.less']
})
export class TweetsHomeComponent implements OnInit {

  tweetContent: string = '';
  validTweet = false;
  isLoggedIn = false;
  profileImage = Constants.DefaultImageUrl as string;

  constructor(private tweetService: TweetService,
    private toastMessageService: ToastMessageService,
    private userService: UserService) {
    // Listen to user login status
    userService.isUserLoggedIn().subscribe(flag => this.isLoggedIn = flag );

    //Lister to current user Details
    userService.getCurrentUser().subscribe(user => {
      this.profileImage = user != null ? user?.image as string : Constants.DefaultImageUrl as string;
    })
  }

  ngOnInit(): void {
  }

  postTweet() {
    if(!this.validTweet || !this.isLoggedIn) {
      return;
    }
    const newTweet: ITweet = {
      tweetContent : this.tweetContent,
      likes: [],
      replies: []
    };

    // Send postTweet request
    this.tweetService.postTweet(newTweet).subscribe(
      (response) => {
        this.tweetContent = "";
        this.validateTweetContent();
        this.tweetService.refreshTweetServices();
      },
      (error) => {
        this.toastMessageService.createToastMessage("Some error occured. Please try again sometime.")
      }
    );
  }

  validateTweetContent() {
    var tweetLength = this.tweetContent.trim().length;
    this.validTweet = tweetLength >= 10 && tweetLength <= 140;
  }
}
