// GroupContext.js
import { createContext, useContext, useState } from 'react';

const GroupContext = createContext(null);

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
  const [currentGroup, setCurrentGroup] = useState(null);

  return (
    <GroupContext.Provider value={{ currentGroup, setCurrentGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
