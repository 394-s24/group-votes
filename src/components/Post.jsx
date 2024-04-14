import React from "react";
import "./feed.css";
import useFirebase from "../utilities/firebase";

const Post = ({ post }) => {
  const { updatePostOptions } = useFirebase(); // Use the useFirebase hook
  const { updatePollVote } = useFirebase(); 

  const handleOptionClick = async (option) => {
    await updatePostOptions("testGroupID", post.id, option); // Call the updatePostOptions function
  };

  const handlePollOptionClick = async (optionIndex) => {
    await updatePollVote("testGroupID", post.id, optionIndex); // Call the updatePollVote function for "Poll" type
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
            <div class="flex justify-end space-x-4  ">
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
        const totalVotes = post.options.reduce((acc, option) => acc + option.votes, 0);
        
        //maximum width required for the buttons
        const maxButtonWidth = post.options.reduce((max, option) => {
          const optionTextWidth = option.text.length * 15; 
          return Math.max(max, optionTextWidth);
        }, 0);

        return (
          <>
            <h5>{post.question}</h5>
            <div className="flex flex-col items-start">
              {post.options.map((option, index) => (
                <div key={index} className="flex items-center my-2 w-full">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 text-base rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handlePollOptionClick(index)}
                  >
                    {option.text}
                  </button>
                  <span className="pl-3 text-gray-700">{option.votes} Votes</span>
                  <div className="bg-gray-200 w-full">
                    <div
                      className="bg-blue-500 h-4"
                      style={{ width: `${(option.votes / totalVotes) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
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
