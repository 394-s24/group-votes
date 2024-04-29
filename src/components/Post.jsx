import React from "react";
import "./feed.css";
import useFirebase from "../utilities/firebase";
import { formatDistanceToNow } from "date-fns";
import { useGroup } from './GroupContext';
import { useState } from "react";

const Post = ({ post }) => {
  const { updatePostOptions } = useFirebase(); // Use the useFirebase hook
  const { updatePollVote } = useFirebase();
  const { currentGroup } = useGroup();


  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = async (option) => {
    // Check if the new option is different from the current option
    if (option !== selectedOption) {
      setSelectedOption(option); // Update the local state to reflect the new selected option
      // Perform the asynchronous operation to update the post options
      console.log(option)
      await updatePostOptions("testGroupID", post.id, option);
      console.log("Post options updated to:", option);
    }
  };
  // const handleOptionClick = async (option) => {
  //   if (!currentGroup) return;
  //   await updatePostOptions(currentGroup.id, post.id, option); // Use the current group ID
  // };

  const handlePollOptionClick = async (optionIndex) => {
    if (!currentGroup) return;
    await updatePollVote(currentGroup.id, post.id, optionIndex); // Use the current group ID
  };

  // Calculate time ago using the 'createdAt' timestamp from the post
  let timeAgo;

  if (post.time && post.time.seconds != null) {
    const postTime = new Date(post.time.seconds * 1000);
    timeAgo = formatDistanceToNow(postTime, { addSuffix: true });
  } else {
    // Handle the case where post.time.seconds is null
    timeAgo = "";
  }


  const renderButton = (option) => (
    <button
      className={`bg-cyan-100 border-2 border-sky-900 text-sky-900 font-bold py-2 px-3 text-base rounded ${
        selectedOption && selectedOption !== option ? 'opacity-50 cursor-not-allowed' : 'hover:border-cyan-100 hover:bg-sky-900 hover:text-cyan-100'
      }`}
      onClick={() => handleOptionClick(option)}
      // disabled={selectedOption && selectedOption !== option}
    >
      {option.charAt(0).toUpperCase() + option.slice(1)}
    </button>
  );
  // const renderButton = (option) => (
  //   <button
  //     className="bg-cyan-100 border-2 border-sky-900 hover:border-cyan-100 hover:bg-sky-900 text-sky-900 hover:text-cyan-100 font-bold py-2 px-3 text-base rounded"
  //     // disabled={selectedOption === option}
  //     onClick={() => handleOptionClick(option)}
  //   >
  //     {option.charAt(0).toUpperCase() + option.slice(1)}
  //   </button>
  // );
  const renderPostContent = () => {
    // Format date and time 
    const formatDateTime = (dateTimeString) => {
      // Check if the input is a valid date string
      const date = new Date(dateTimeString);
      if (isNaN(date)) {
        // If the date isn't valid, return TBD
        return "TBD";
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${month}/${day}/${year} ${hours}:${minutes}`;
    };
    switch (post.postType) {
      case "Event":
        return (
          <>
            <h5>{post.eventName}</h5>
            {post.eventStart && (
              <p>
                {formatDateTime(post.eventStart)} - {formatDateTime(post.eventEnd)}
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
                {renderButton("yes")}
                  <p>{post.yes} Yes</p>
                </div>
              <div className="text-center">
                {renderButton("maybe")}
                <p>{post.maybe} Maybe</p>
              </div>
              <div className="text-center">
                {renderButton("no")}
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
            <div className="flex justify-end space-x-4  ">
                <div className="text-center">
                {renderButton("yes")}
                  <p>{post.yes} Yes</p>
                </div>
              <div className="text-center">
                {renderButton("maybe")}
                <p>{post.maybe} Maybe</p>
              </div>
              <div className="text-center">
                {renderButton("no")}
                <p>{post.no} No</p>
              </div>
            </div>
          </>
        );
      case "Poll":
        const totalVotes = post.options.reduce(
          (acc, option) => acc + option.votes,
          0
        );

        //maximum width required for the buttons
        const longestOptionLength = post.options.reduce((max, option) => {
          return Math.max(max, option.text.length);
        }, 0);

        return (
          <>
            <h5>{post.question}</h5>
            <div className="flex flex-col items-start">
              {post.options.map((option, index) => {
                const votePercentage =
                  totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                // const votePercentage = (option.votes / totalVotes) * 100;
                return (
                  <div key={index} className="w-full my-2">
                    <button
                      className="relative text-left w-full text-black font-bold py-2 px-3 text-base rounded focus:outline-none focus:shadow-outline overflow-hidden"
                      style={{ border: "1px solid #000" }}
                      onClick={() => handlePollOptionClick(index)}
                    >
                      <span style={{ zIndex: 0, position: "relative" }}>
                        {`${option.text} - ${option.votes}`}
                      </span>
                      <span
                        className="absolute top-0 left-0 h-full"
                        style={{
                          width: `${votePercentage}%`,
                          background: "rgba(207,250,254,1)",
                          zIndex: -1,
                        }}
                      ></span>
                      <span
                        className="absolute top-0 left-0 h-full w-full flex items-center justify-end pr-3"
                        style={{ zIndex: 0, color: "black" }}
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
      <small>
        "{post.author}" {timeAgo}
      </small>
      {renderPostContent()}
    </div>
  );
};

export default Post;
