import { useState } from "react";
import { Tweet as TweetType } from "../types";
import { FaRegCommentDots, FaHeart, FaRetweet } from "react-icons/fa";

interface TweetProps {
  tweet: TweetType;
  onLikeClick: (tweetId: string) => void;
  onRetweetClick: (tweetId: string) => void;
  onReplyClick: (tweetId: string) => void;
  onReplySubmit: (tweetId: string, replyText: string) => void;
}

const Tweet: React.FC<TweetProps> = ({
  tweet,
  onLikeClick,
  onRetweetClick,
  onReplyClick,
  onReplySubmit,
}) => {
  const [replyText, setReplyText] = useState<string>("");

  const handleReplySubmit = () => {
    if (replyText) {
      onReplySubmit(tweet.uuid, replyText);
      setReplyText("");
    }
  };

  return (
    <div key={tweet.uuid} className="bg-white shadow-md rounded-lg p-4 mb-4 transition-all hover:shadow-lg">
      <div className="flex items-start">
        <img
          src={new URL(`../${tweet.profilePic}`, import.meta.url).href}
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{tweet.handle}</p>
          <p className="text-gray-700 mt-1">{tweet.tweetText}</p>
          <div className="flex justify-around mt-3 text-gray-600">
            <button
              className="flex items-center space-x-2"
              onClick={() => onReplyClick(tweet.uuid)}
            >
              <FaRegCommentDots />
              <span>{tweet.replies.length}</span>
            </button>
            <button
              className={`flex items-center space-x-2 ${tweet.isLiked ? "text-red-500" : ""}`}
              onClick={() => onLikeClick(tweet.uuid)}
            >
              <FaHeart />
              <span>{tweet.likes}</span>
            </button>
            <button
              className={`flex items-center space-x-2 ${tweet.isRetweeted ? "text-green-500" : ""}`}
              onClick={() => onRetweetClick(tweet.uuid)}
            >
              <FaRetweet />
              <span>{tweet.retweets}</span>
            </button>
          </div>
          <div className="mt-4">
            <textarea
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleReplySubmit}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg font-semibold hover:bg-blue-600"
            >
              Reply
            </button>
          </div>
          {tweet.replies.length > 0 && (
            <div className="mt-4" id={`replies-${tweet.uuid}`}>
              {tweet.replies.map((reply, index) => (
                <div key={index} className="flex items-start mb-2 ml-12">
                  <img
                    src={new URL(`../${reply.profilePic}`, import.meta.url).href}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {reply.handle}
                    </p>
                    <p className="text-gray-700">{reply.tweetText}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
