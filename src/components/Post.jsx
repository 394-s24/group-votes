import React from 'react';
import './feed.css';
import useFirebase from '../utilities/firebase';

const Post = ({ post }) => {
  const { updatePostOptions } = useFirebase(); // Use the useFirebase hook
  
  const handleOptionClick = async (option) => {
    await updatePostOptions("testGroupID", post.id, option); // Call the updatePostOptions function
  };

  const renderPostContent = () => {
    switch (post.postType) {
      case 'Event':
        return (
          <>
            <h5>{post.eventName}</h5>
            {post.eventStart && <p>{post.eventStart} {post.eventEnd}</p>}
            {post.eventLocation && <p>Location: {post.eventLocation}</p>}
            {post.description && <p>{post.description}</p>}
            {post.link && <a href={post.link} target="_blank" rel="noopener noreferrer">More Info</a>}
            {/* Yes, Maybe, No buttons */}
            <div>
              <button className="btn btn-success mr-2" onClick={() => handleOptionClick('yes')}>Yes</button>
              <button className="btn btn-secondary mr-2" onClick={() => handleOptionClick('maybe')}>Maybe</button>
              <button className="btn btn-danger" onClick={() => handleOptionClick('no')}>No</button>
            </div>
          </>
        );
      case 'Vote':
        return (
          <>
            <h5>{post.question}</h5>
            {post.link && <a href={post.link} target="_blank" rel="noopener noreferrer">More Info</a>}
            {/* Yes, Maybe, No buttons */}
            <div>
              <button className="btn btn-success mr-2" onClick={() => handleOptionClick('yes')}>Yes</button>
              <button className="btn btn-secondary mr-2" onClick={() => handleOptionClick('maybe')}>Maybe</button>
              <button className="btn btn-danger" onClick={() => handleOptionClick('no')}>No</button>
            </div>
          </>
        );
      case 'Poll':
        return (
          <>
            {post.options.map((option, index) => (
              <p key={index}>{option}</p>
            ))}
          </>
        );
      case 'Reminder':
        return (
          <>
            <h5>{post.text}</h5>
            {post.link && <a href={post.link} target="_blank" rel="noopener noreferrer">More Info</a>}
          </>
        );
      default:
        return <p>Unsupported post type</p>;
    }
  };

  return (
    <div className="post">
      <small>"{post.author}"  1hr</small>
      {renderPostContent()}
    </div>
  );
};

export default Post;