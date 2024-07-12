import { createContext, useState, useContext } from "react";

const LikeContext = createContext();

function LikeProvider({ children }) {
  const [likedPosts, setLikedPosts] = useState({});

  function toggleLike(postId) {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId],
    }));
  }

  return (
    <LikeContext.Provider value={{ likedPosts, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
}

function useLike() {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLike must be used within a LikeProvider");
  }
  return context;
}

export { LikeProvider, useLike };
