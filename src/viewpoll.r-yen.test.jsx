import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Feed from "./components/Feed";
import { GroupProvider } from "./components/GroupContext";

vi.mock('react-router-dom', () => ({
  useParams: vi.fn().mockReturnValue({ groupId: 'testGroupID' }),
}));

const mockUpdatePollVote = vi.fn();

vi.mock('./utilities/firebase', () => ({
  default: () => ({
    fetchPostsForGroup: (groupId, setPosts) => {
      const mockPosts = [
        {
          id: "1",
          question: "What is your preferred event date?",
          postType: "Poll",
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
    updatePollVote: mockUpdatePollVote
  })
}));

describe("Poll Preferences", () => {
  test("shows poll question and options with votes", async () => {
    render(<GroupProvider><Feed /></GroupProvider>);

    expect(screen.getByText(/What is your preferred event date\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Option 1 - 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Option 2 - 20/i)).toBeInTheDocument();
    expect(screen.getByText(/Option 3 - 30/i)).toBeInTheDocument();
  });
});
