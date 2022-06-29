import { IReplyTweet } from "./itweetreply";
import { IUserAccount } from "./iuseraccount";

export interface ITweet {
    id?: string;

    tweetContent?: string;

    date?: string;

    replies?: IReplyTweet[];

    likes: string[];

    user?: IUserAccount;
}