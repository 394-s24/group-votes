import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Feed from './Feed';

const Dispatcher = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Feed groupId={"testGroupID"} />} />
      {/* <Route path="/group" element={<Group users={users} />} /> */}
    </Routes>
    <Navigation />
  </BrowserRouter>
);

export default Dispatcher;
