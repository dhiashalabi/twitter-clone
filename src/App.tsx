import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Tweet as TweetType } from "./types";
import { saveTweetsToLocalStorage, loadTweetsFromLocalStorage } from "./utils";
import { tweetsData } from "./data";
import TweetInput from "./components/TweetInput";
import TweetList from "./components/TweetList";
import { getRandomUser } from "./utils";

function App() {
  const [tweets, setTweets] = useState<TweetType[]>(() => {
    const storedTweets: TweetType[] = loadTweetsFromLocalStorage();

    const combinedTweets = [
      ...storedTweets,
      ...tweetsData.filter(
        (tweet: TweetType) =>
          !storedTweets.some(
            (storedTweet: TweetType) => storedTweet.uuid === tweet.uuid
          )
      ),
    ];
    return combinedTweets;
  });

  useEffect(() => {
    saveTweetsToLocalStorage(tweets);
  }, [tweets]);

  const handleLikeClick = (tweetId: string) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.uuid === tweetId
          ? {
              ...tweet,
              isLiked: !tweet.isLiked,
              likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1,
            }
          : tweet
      )
    );
  };

  const handleRetweetClick = (tweetId: string) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.uuid === tweetId
          ? {
              ...tweet,
              isRetweeted: !tweet.isRetweeted,
              retweets: tweet.isRetweeted
                ? tweet.retweets - 1
                : tweet.retweets + 1,
            }
          : tweet
      )
    );
  };

  const handleReplyClick = (tweetId: string) => {
    const replyElement = document.getElementById(`replies-${tweetId}`);
    if (replyElement) {
      replyElement.classList.toggle("hidden");
    }
  };

  const handleReplySubmit = (tweetId: string, replyText: string) => {
    if (replyText) {
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.uuid === tweetId
            ? {
                ...tweet,
                replies: [
                  ...tweet.replies,
                  {
                    handle: `@${getRandomUser().name.split(" ")[0]}`,
                    profilePic: getRandomUser().image,
                    tweetText: replyText,
                  },
                ],
              }
            : tweet
        )
      );
    }
  };

  const handleTweetBtnClick = (tweetText: string) => {
    if (tweetText) {
      const { name, image } = getRandomUser();

      setTweets([
        {
          handle: `@${name.split(" ")[0]}`,
          profilePic: image,
          likes: 0,
          retweets: 0,
          tweetText,
          replies: [],
          isLiked: false,
          isRetweeted: false,
          uuid: uuidv4(),
        },
        ...tweets,
      ]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <TweetInput onTweet={handleTweetBtnClick} />
      <TweetList
        tweets={tweets}
        onLikeClick={handleLikeClick}
        onRetweetClick={handleRetweetClick}
        onReplyClick={handleReplyClick}
        onReplySubmit={handleReplySubmit}
      />
    </div>
  );
}

export default App;
