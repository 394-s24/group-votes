// GroupFeeds.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGroup } from './GroupContext'; 
import useFirebase from '../utilities/firebase';
import './groupfeeds.css';

const GroupFeeds = () => {
  const [groups, setGroups] = useState([]);
  const { fetchGroups } = useFirebase();
  const navigate = useNavigate();
  const { setCurrentGroup } = useGroup(); // Get the function to set the current group from context

  useEffect(() => {
    // Subscribe to groups
    const unsubscribe = fetchGroups(setGroups);

    // Unsubscribe on component unmount
    return () => unsubscribe();
  }, [fetchGroups]);
  const handleGroupClick = (group) => {
    setCurrentGroup(group); // Set the selected group as the current group globally
    navigate(`/feed/${group.id}`); // Navigate to the feed route with the group ID
    console.log("current Group Id: ", group.id)
  };

  return (
    <div className="group-feeds">
      {groups.length > 0 ? (
        groups.map(group => (
          <button 
            key={group.id} 
            className="bg-cyan-100 border-2 border-sky-900 hover:border-cyan-100 hover:bg-sky-900 text-sky-900 hover:text-cyan-100 font-bold py-2 px-3 text-base rounded block w-full text-left mt-2"
            onClick={() => handleGroupClick(group)}
          >
            <div>
              <h4>{group.groupname}</h4> 
              <p>{group.description}</p> 
            </div>
          </button>
        ))
      ) : (
        <h3>No groups found. Join a new group or check back later.</h3>
      )}
    </div>
  );
};


export default GroupFeeds