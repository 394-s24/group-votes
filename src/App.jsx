import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';
import { useData, useUserState } from './firebase';

vi.mock('./firebase');

const mockVotes = {
  "title": "Mock Event Votes for 2024",
  "events": { }
};

describe('App component tests', () => {
  it('shows today\'s date', () => {
    render(<App />);
    const today = new Date();
    const day = today.toLocaleString([], { weekday: "long" });
    const date = today.toLocaleDateString([], { dateStyle: "long" });
    const dateText = screen.getByText(`Today is ${day}, ${date}.`);
    expect(dateText).toBeInTheDocument();
  });

  it('renders the Dispatcher component', () => {
    render(<App />);
    const dispatcherElement = screen.getByTestId('dispatcher-component');
    expect(dispatcherElement).toBeInTheDocument();
  });

  it('uses mock data for events', () => {
    useData.mockReturnValue([mockVotes, false, null]);
    useUserState.mockReturnValue([null]);
    render(<App />);
    const title = screen.getByText(/Mock Event Votes for 2024/i);
    expect(title).toBeInTheDocument();
  });

  it('shows Sign In if not logged in', () => {
    useData.mockReturnValue([mockVotes, false, null]);
    useUserState.mockReturnValue([null]);
    render(<App />);
    const button = screen.getByText(/Sign In/i);
    expect(button).toBeInTheDocument();
  });

  it('shows Sign Out if logged in', () => {
    useData.mockReturnValue([mockVotes, false, null]);
    useUserState.mockReturnValue([{ displayName: 'Joe' }]);
    render(<App />);
    const button = screen.getByText(/Sign Out/i);
    expect(button).toBeInTheDocument();
  });

  it('asks for data once with a schedule path', () => {
    useData.mockReturnValue([mockVotes, false, null]);
    useUserState.mockReturnValue([null]);
    render(<App />);
    expect(useData).toHaveBeenCalledTimes(1);
    expect(useData).toHaveBeenCalledWith('/schedule', expect.any(Function));
  });
});
