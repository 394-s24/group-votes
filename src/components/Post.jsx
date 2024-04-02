import React from "react";
import "./feed.css";
import useFirebase from "../utilities/firebase";

const Post = ({ post }) => {
  const { updatePostOptions } = useFirebase(); // Use the useFirebase hook

  const handleOptionClick = async (option) => {
    await updatePostOptions("testGroupID", post.id, option); // Call the updatePostOptions function
  };

  const renderPostContent = () => {
    switch (post.postType) {
      case "Event":
        return (
          <>
            <h5>{post.eventName}</h5>
            {post.eventStart && (
              <p>
                {post.eventStart} {post.eventEnd}
              </p>
            )}
            {post.eventLocation && <p>Location: {post.eventLocation}</p>}
            {post.description && <p>{post.description}</p>}
            {post.link && (
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            )}
            {/* Yes, Maybe, No buttons */}
            <div class="flex justify-end space-x-4">
              <div class="text-center">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 text-base rounded"
                  onClick={() => handleOptionClick("yes")}
                >
                  Yes
                </button>
                <p>{post.yes} Yes</p>
              </div>
              <div class="text-center">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 text-base rounded"
                  onClick={() => handleOptionClick("maybe")}
                >
                  Maybe
                </button>
                <p>{post.maybe} Maybe</p>
              </div>
              <div class="text-center">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 text-base rounded"
                  onClick={() => handleOptionClick("no")}
                >
                  No
                </button>
                <p>{post.no} No</p>
              </div>
            </div>
          </>
        );
      case "Vote":
        return (
          <>
            <h5>{post.question}</h5>
            {post.link && (
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            )}
            {/* Yes, Maybe, No buttons */}
            <div class="flex justify-end space-x-4">
              <div class="text-center">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 text-base rounded"
                  onClick={() => handleOptionClick("yes")}
                >
                  Yes
                </button>
                <p>{post.yes} Yes</p>
              </div>
              <div class="text-center">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 text-base rounded"
                  onClick={() => handleOptionClick("maybe")}
                >
                  Maybe
                </button>
                <p>{post.maybe} Maybe</p>
              </div>
              <div class="text-center">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 text-base rounded"
                  onClick={() => handleOptionClick("no")}
                >
                  No
                </button>
                <p>{post.no} No</p>
              </div>
            </div>
          </>
        );
      case "Poll":
        return (
          <>
            {post.options.map((option, index) => (
              <p key={index}>{option}</p>
            ))}
          </>
        );
      case "Reminder":
        return (
          <>
            <h5>{post.text}</h5>
            {post.link && (
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            )}
          </>
        );
      default:
        return <p>Unsupported post type</p>;
    }
  };

  return (
    <div className="post">
      <small>"{post.author}" 1hr</small>
      {renderPostContent()}
    </div>
  );
};

export default Post;
