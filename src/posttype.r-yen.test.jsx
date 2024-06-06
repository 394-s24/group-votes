import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Feed from "./components/Feed";
import { GroupProvider } from "./components/GroupContext";
import { useParams } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn().mockReturnValue({ groupId: 'testGroupID' }),
}));

vi.mock('./utilities/firebase', () => ({
  default: () => ({
    fetchPostsForGroup: (groupId, setPosts) => {
      const mockPosts = [
        { id: "1", text: "This is a reminder", postType: "Reminder", groupId: "testGroupID" },
        { id: "2", eventName: "Event Name", postType: "Event", groupId: "testGroupID" },
        { id: "3", question: "Vote Question", postType: "Vote", groupId: "testGroupID" },
        {
          id: "4",
          question: "Poll Question",
          postType: "Poll",
          groupId: "testGroupID",
          options: [
            { text: "Option 1", votes: 10 },
            { text: "Option 2", votes: 20 },
            { text: "Option 3", votes: 30 }
          ]
        }
      ];
      setPosts(mockPosts);
      return () => {}; // Mock unsubscribe function
    },
    updatePollVote: vi.fn()
  })
}));

describe("Feed Component", () => {
  test("displays different post types", async () => {
    render(<GroupProvider><Feed /></GroupProvider>);

    expect(screen.getByText(/This is a reminder/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Vote Question/i)).toBeInTheDocument();
    expect(screen.getByText(/Poll Question/i)).toBeInTheDocument();
  });
});
