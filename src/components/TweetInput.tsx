import { useState } from "react";

interface TweetInputProps {
  onTweet: (tweetText: string) => void;
}

const TweetInput: React.FC<TweetInputProps> = ({ onTweet }) => {
  const [tweetInput, setTweetInput] = useState<string>("");

  const handleTweetBtnClick = () => {
    if (tweetInput) {
      onTweet(tweetInput);
      setTweetInput("");
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm p-4 bg-white mb-6">
      <textarea
        placeholder="What's happening?"
        value={tweetInput}
        onChange={(e) => setTweetInput(e.target.value)}
        className="w-full h-24 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50 text-gray-800"
      />
      <button
        onClick={handleTweetBtnClick}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Tweet
      </button>
    </div>
  );
};

export default TweetInput;
