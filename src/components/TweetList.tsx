import { Tweet as TweetType } from "../types";
import Tweet from "./Tweet";

interface TweetListProps {
  tweets: TweetType[];
  onLikeClick: (tweetId: string) => void;
  onRetweetClick: (tweetId: string) => void;
  onReplyClick: (tweetId: string) => void;
  onReplySubmit: (tweetId: string, replyText: string) => void;
}

const TweetList: React.FC<TweetListProps> = ({
  tweets,
  onLikeClick,
  onRetweetClick,
  onReplyClick,
  onReplySubmit,
}) => {
  return (
    <div id="feed" className="mt-6">
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.uuid}
          tweet={tweet}
          onLikeClick={onLikeClick}
          onRetweetClick={onRetweetClick}
          onReplyClick={onReplyClick}
          onReplySubmit={onReplySubmit}
        />
      ))}
    </div>
  );
};

export default TweetList;
