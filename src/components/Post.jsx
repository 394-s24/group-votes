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

  const renderButton = (option) => (
    <button
      className="bg-cyan-100 border-2 border-sky-900 hover:border-cyan-100 hover:bg-sky-900 text-sky-900 hover:text-cyan-100 font-bold py-2 px-3 text-base rounded"
      // disabled={selectedOption === option}
      onClick={() => handleOptionClick(option)}
    >
      {option.charAt(0).toUpperCase() + option.slice(1)}
    </button>
  );
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
            <div className="flex justify-end space-x-4  ">
              <div className="text-center">
                <button
                  class="bg-cyan-100 border-2 border-sky-900 hover:border-cyan-100 hover:bg-sky-900 text-sky-900 hover:text-cyan-100 font-bold py-2 px-3 text-base rounded"
                  onClick={() => handleOptionClick("yes")}
                >
                  Yes
                </button>
                <p>{post.yes} Yes</p>
              </div>
              <div className="text-center">
                 {renderButton("maybe")} 
                <p>{post.maybe} Maybe</p>
              </div>
              <div className="text-center">
                <button
                  class="bg-cyan-100 border-2 border-sky-900 hover:border-cyan-100 hover:bg-sky-900 text-sky-900 hover:text-cyan-100 font-bold py-2 px-3 text-base rounded"
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
            <div className="flex justify-end space-x-4">
              <div className="text-center">
                <button
                  class="bg-cyan-100 border-2 border-sky-900 hover:border-cyan-100 hover:bg-sky-900 text-sky-900 hover:text-cyan-100 font-bold py-2 px-3 text-base rounded"
                  onClick={() => handleOptionClick("yes")}
                >
                  Yes
                </button>
                <p>{post.yes} Yes</p>
              </div>
              <div className="text-center">
                <button
                  class="bg-cyan-100 border-2 border-sky-900 hover:border-cyan-100 hover:bg-sky-900 text-sky-900 hover:text-cyan-100 font-bold py-2 px-3 text-base rounded"
                  onClick={() => handleOptionClick("maybe")}
                >
                  Maybe
                </button>
                <p>{post.maybe} Maybe</p>
              </div>
              <div className="text-center">
                <button
                  class="bg-cyan-100 border-2 border-sky-900 hover:border-cyan-100 hover:bg-sky-900 text-sky-900 hover:text-cyan-100 font-bold py-2 px-3 text-base rounded"
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
        const longestOptionLength = post.options.reduce((max, option) => {
          return Math.max(max, option.text.length);
        }, 0);
        

        return (
          <>
          <h5>{post.question}</h5>
            <div className="flex flex-col items-start">
              {post.options.map((option, index) => {
                const votePercentage = (option.votes / totalVotes) * 100;
                return (
                  <div key={index} className="w-full my-2">
                    <button
                      className="relative text-left w-full text-white font-bold py-2 px-3 text-base rounded focus:outline-none focus:shadow-outline overflow-hidden"
                      style={{ border: '1px solid #000' }}
                      onClick={() => handlePollOptionClick(index)}
                    >
                      <span style={{ zIndex: 2, position: 'relative' }}>
                        {`${option.text} - ${option.votes}`}
                      </span>
                      <span
                        className="absolute top-0 left-0 h-full"
                        style={{ width: `${votePercentage}%`, background: 'rgba(51,130,250,255)', zIndex: -1}}
                      ></span>
                      <span
                        className="absolute top-0 left-0 h-full w-full flex items-center justify-end pr-3"
                        style={{ zIndex: 0, color: 'black' }}
                      >
                        {votePercentage.toFixed(0)}%
                      </span>
                    </button>
                  </div>
                );
              })}
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
