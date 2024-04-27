import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Feed from './Feed';
import GroupFeeds from './GroupFeed';

const Dispatcher = () => (
  <BrowserRouter>
  
    <Routes>
      <Route path="/" element={<Feed groupId={"testGroupID"} />} />
      <Route path="/group" element={<GroupFeeds />} />
      <Route path="/feed/:groupId" element={<Feed />} />
      {/* <Route path="/group" element={<Group users={users} />} /> */}
    </Routes>
    
    <div style={{ position: "fixed", bottom: "0px", left: "0", right: "0", maxWidth: "100vw" }}>
      <Navigation />
    </div>

  </BrowserRouter>
);

export default Dispatcher;
