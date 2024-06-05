import { describe, expect, test, vi} from "vitest";
import { render, screen, fireEvent, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Navigation from "./components/Navigation";
import AuthButton from "./components/Navigation";
import useFireBase from './utilities/firebase';
import { unsubscribe } from "diagnostics_channel";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { fetchPostsForGroup } from './utilities/firebase';
import NewPost from "./components/NewPost";
import Feed from "./components/Feed";
import {GroupProvider} from "./components/GroupContext"


vi.mock('react-router-dom', () => ({
    useParams: vi.fn().mockReturnValue({ groupId: 'test-group' })
  }));
  
  // Mock the custom hook that provides fetchPostsForGroup
vi.mock('./utilities/firebase', () => ({
    default: () => ({
        fetchPostsForGroup: (groupId, setPosts) => {
            const mockPosts = [
                {
                    id: "1",
                    eventName: "testEvent1",
                    options: [{votes: 10, text: "testing purposes"}],
                    postType: "Event",
                }
            ];
            setPosts(mockPosts);
            return () => {}; // Mock unsubscribe function
        }
    })
}));

describe("event testing", () => {
    it("voting on event", async () =>{
        render(<GroupProvider><Feed /></GroupProvider>);
        expect(screen.getByText(/testEvent1/i));

    })
});




