import { Component, Input, OnInit } from '@angular/core';
import { ITweet } from 'src/app/models/itweet';
import { IUser } from 'src/app/models/iuser';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { TweetService } from 'src/app/services/tweet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.less']
})
export class TweetsComponent implements OnInit {

  @Input() tweet!: ITweet;
  enableDelete = false;
  enableLike = false;
  enableReply = false;
  currentUser!: IUser;
  tweetLiked = false;
  reply: string = "";
  indexAllowed: number = 5;
  showReplies: boolean = false;
  isValidReply: boolean = false;
  totalLikes: number = 0;
  totalReplies: number = 0;
  
  constructor(private userService: UserService, 
    private tweetService: TweetService,
    private toastMessageService: ToastMessageService) {
    userService.getCurrentUser().subscribe(user => {
        this.currentUser = user;
      });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.enableDelete = (this.currentUser?.id == this.tweet?.user?.id);
    this.enableLike = this.currentUser != null;
    this.enableReply = this.currentUser != null;
    this.tweetLiked = this.tweet.likes?.includes(this.currentUser?.id ? this.currentUser.id : "");
    this.showReplies = this.tweet.replies !=null && this.tweet.replies.length > 0;
    this.totalReplies = this.tweet.replies != null ? this.tweet.replies?.length: 0;
    this.totalLikes = this.tweet.likes.length;
  }

  likeTweet() {
    if(!this.currentUser) {
      return;
    }
    this.tweetService.sendLikeTweetRequest(this.tweet.id);
  }

  deleteTweet() {
    if(!this.enableDelete) {
      return;
    } 
    this.tweetService.sendDeleteTweetRequest(this.tweet.id);
  }

  replyTweet(reply: any) {
    if(!this.validReply()){
      return;
    }

    // Send Reply to Tweet
    this.tweetService.sendReplyTweetRequest(reply, this.tweet.id)
      .subscribe(
        (response) => {
          this.reply = "";
          this.tweetService.refreshTweetServices();
        },
        (error) => {
          this.toastMessageService.createToastMessage("Some error occured. Please try again sometime.")
        }
      );
  }

  validReply(): boolean {
    var tweetLength = this.reply.trim().length;
    this.isValidReply = tweetLength >= 10 && tweetLength <= 140;
    return this.isValidReply;
  }

  toggleRepliesView() {
    this.showReplies = !this.showReplies;
  }

  expand(flag: boolean) {
    if(flag) {
      this.indexAllowed = this.indexAllowed * 2;
    }
    else {
      this.indexAllowed = this.indexAllowed /2;
    }
  }
}
