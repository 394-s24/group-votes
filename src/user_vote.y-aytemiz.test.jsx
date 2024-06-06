import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Feed from "./components/Feed";
import { GroupProvider } from "./components/GroupContext";
import { useParams } from 'react-router-dom';
import useFirebase from './utilities/firebase';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
    useParams: vi.fn().mockReturnValue({ groupId: '12345' }),
}));

// Mock firebase utilities
const mockUpdatePollVote = vi.fn();
const mockFetchPostsForGroup = vi.fn((groupId, setPosts) => {
    const mockPosts = [
        {
            id: "1",
            eventName: "test2",
            options: [{ votes: 0, text: "test 1" }],
            postType: "Poll",
            time: new Date().toISOString()
        }
    ];
    setPosts(mockPosts);
    return () => {}; 
});

vi.mock('./utilities/firebase', () => {
    return {
        __esModule: true,
        default: () => ({
            fetchPostsForGroup: mockFetchPostsForGroup,
            updatePollVote: mockUpdatePollVote,
        })
    };
});

describe("Poll voting tests", () => {
    beforeEach(() => {
        mockUpdatePollVote.mockClear();
        mockFetchPostsForGroup.mockClear();
    });

    test("updates poll vote", async () => {
        render(
            <GroupProvider>
                <Feed />
            </GroupProvider>
        );

        // Check initial vote count
        expect(screen.getByText(/test 1/i)).to.exist;
        // expect(screen.getByText(/votes/i)).to.exist;

        // Simulate voting on an option
        const voteButton = screen.getByRole('button', { name: /test 1/i });
        fireEvent.click(voteButton);

   
        expect(screen.getByText(/1/i)).to.exist;
    });
});
