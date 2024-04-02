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
            <div class="flex items-center justify-start">
              <button
                class="bg-green-500 text-white p-2 rounded-lg mr-2 hover:bg-green-300"
                onClick={() => handleOptionClick("yes")}
              >
                Yes
              </button>
              <button
                class="bg-yellow-500 text-white p-2 rounded-lg mr-2 hover:bg-yellow-300"
                onClick={() => handleOptionClick("maybe")}
              >
                {" "}
                Maybe
              </button>
              <button
                class="bg-red-500 hover:bg-red-400 text-white p-2 rounded-lg "
                onClick={() => handleOptionClick("no")}
              >
                No
              </button>
            </div>
            <div class="flex items-right justify-start mt-4">
              <p class="text-green-500 mr-2">{post.yes} Yes</p>
              <p class="text-yellow-500 mr-2">{post.maybe} Maybe</p>
              <p class="text-red-500">{post.no} No</p>
            </div>

            <div class="flex items-center justify-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
              <button class="bg-blue-900 text-white p-1 rounded mr-2">
                Maybe
              </button>
              <button class="bg-blue-900 text-white p-1 rounded">No</button>
            </div>
            <div class="flex items-center justify-center mt-4">
              <p class="mr-2">10 Yes</p>
              <p class="mr-2">5 Maybe</p>
              <p>3 No</p>
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
            <div>
              <button
                className="btn btn-success mr-2"
                onClick={() => handleOptionClick("yes")}
              >
                Yes
              </button>
              <button
                className="btn btn-secondary mr-2"
                onClick={() => handleOptionClick("maybe")}
              >
                Maybe
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleOptionClick("no")}
              >
                No
              </button>
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
