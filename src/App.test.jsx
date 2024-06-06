import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers
import Post from './components/Post';
import { GroupProvider } from './components/GroupContext';
import App from './App';

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