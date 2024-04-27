import React, { useState, useEffect } from 'react';
import useFirebase from '../utilities/firebase';
import Post from './Post';
import PostButton from './PostButton';
import './feed.css';
import { useGroup } from './GroupContext';
import { useParams } from 'react-router-dom';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { fetchPostsForGroup } = useFirebase();
  const { groupId } = useParams();

  // Load in posts for the current group
  useEffect(() => {
    if (!groupId) return;

    const unsubscribe = fetchPostsForGroup(groupId, setPosts);
    return () => unsubscribe();
  }, [groupId, fetchPostsForGroup]);

  return (
    <div className="feed">
      {/* {console.log("this is the groupID: ", groupId)} */}
      {posts.length === 0 ? (
        <h3>No posts found in this group. Make a new post or check back later.</h3>
      ) : (
        posts.map(post => <Post key={post.id} post={post} />)
      )}
      <PostButton />
    </div>
  );
};

export default Feed;
