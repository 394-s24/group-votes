import React, { useState, useEffect } from 'react';
import useFirebase from '../utilities/firebase';
import Post from './Post';
import PostButton from './PostButton';
import './feed.css';

const Feed = ({ groupId }) => {
  const [posts, setPosts] = useState([]);
  const { fetchPostsForGroup } = useFirebase();

  // Load in posts
  useEffect(() => {
    if (!groupId) return;
    
    // Subscribe to posts in the specified group
    const unsubscribe = fetchPostsForGroup(groupId, setPosts);

    // Unsubscribe on component unmount
    return () => unsubscribe();
  }, [groupId]);

  return (
    <>
      <div className="feed">
        {posts.length === 0 ? (
          <h3>Nothing here. Make a new post or check back later.</h3>
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        )}
      </div>
      
      <div style={{ height: "130px" }}></div>

      <div style={{ position: "fixed", bottom: "100px", right: "30px" }}>
        <PostButton />
      </div>
    </>
  );
};

export default Feed;