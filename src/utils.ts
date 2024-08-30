import { users } from "./users";
import { Tweet } from "./types";

export function getRandomUser() {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  }

export function saveTweetsToLocalStorage(tweets: Tweet[]): void {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

export function loadTweetsFromLocalStorage(): Tweet[] {
  const savedTweets = localStorage.getItem("tweets");
  return savedTweets ? JSON.parse(savedTweets) : [];
}
