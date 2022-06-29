import { IUserAccount } from "./iuseraccount";

export interface IReplyTweet {

    tweetContent?: string;

    date?: string;

    user?: IUserAccount;
}