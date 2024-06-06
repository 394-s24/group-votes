import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Post from './components/Post';
import { GroupProvider, useGroup } from './components/GroupContext';
import App from './App';
import { BrowserRouter, Router } from 'react-router-dom';
import GroupFeeds from './components/GroupFeed';
import Feed from './components/Feed';
import useFirebase from './utilities/firebase';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Dispatcher from './components/Dispatcher';

describe('App component tests', () => {

  test("should display today's date", () => {
    render(<App />);
    const today = new Date();
    const day = today.toLocaleString([], { weekday: "long" });
    const date = today.toLocaleDateString([], { dateStyle: "long" });
    const dateText = screen.getByText(`Today is ${day}, ${date}.`);
    expect(dateText).toBeDefined();
  });

  test("should render the Dispatcher component", () => {
    render(<App />);
    const dispatcherElement = screen.getByTestId('dispatcher-component');
    expect(dispatcherElement).toBeDefined();
  });
});

describe('Date formatting test', () => {
  test("should display properly formatted date in event post", () => {
    const post = {
      id: 123,
      author: "Jan Doe",
      postType: "Event",
      eventName: "Test Event",
      eventStart: "12-31-2022",
      eventEnd: "",
      eventLocation: "",
      description: "",
      question: "",
      options: [{ text: '', votes: 0 }],
      text: "",
      link: "",
      time: null
    };

    render(
      <GroupProvider>
        <Post post={post} />
      </GroupProvider>
    );

    const formattedDate = screen.getByText((content, element) => {
      return content.includes("12/31/2022");
    });
    expect(formattedDate).toBeInTheDocument();
  });
});

// Mock useFirebase to provide test data
vi.mock('./utilities/firebase', () => ({
  __esModule: true,
  default: () => ({
    fetchGroups: (setGroups) => {
      setGroups([
        { id: 'group1', groupname: 'Group 1', description: 'This is group 1' },
        { id: 'group2', groupname: 'Group 2', description: 'This is group 2' },
      ]);
      return () => {};
    },
    fetchPostsForGroup: (groupId, setPosts) => {
      setPosts([
        { id: 'post1', author: "Jan Doe", postType: "Event", eventName: `This is a post for ${groupId}`, },
      ]);
      return () => {};
    },
    useAuthState: () => [null, false, false], // Mock not authenticated state
  }),
}));

describe('Group feed navigation test', () => {
  beforeEach(() => {
    vi.resetAllMocks(); // Reset mocks before each test
  });

  test("should switch to the feed of the clicked group", async () => {
    render(
      <MemoryRouter initialEntries={['/group']}>
        <GroupProvider>
          <Routes>
            <Route path="/group" element={<GroupFeeds />} />
            <Route path="/feed/:groupId" element={<Feed />} />
          </Routes>
        </GroupProvider>
      </MemoryRouter>
    );

    // Wait for groups to be fetched and rendered
    await waitFor(() => {
      const groupButton = screen.getByText('Group 1');
      expect(groupButton).toBeInTheDocument();
    });

    // Find and click the button for "Group 1"
    const groupButton = screen.getByText('Group 1');
    fireEvent.click(groupButton);

    // Check if the Feed component for "Group 1" is displayed
    await waitFor(() => {
      const postContent = screen.getByText('This is a post for group1');
      expect(postContent).toBeInTheDocument();
    });
  });
});