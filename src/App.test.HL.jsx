import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { useData, useUserState } from "./firebase";

vi.mock("./firebase");

const mockVotes = {
  title: "Mock Event Votes for 2024",
  events: {
    event1: {
      name: "Event 1",
      votes: 5,
    },
    event2: {
      name: "Event 2",
      votes: 3,
    },
  },
};

describe("App component tests", () => {
  beforeEach(() => {
    useData.mockReturnValue([mockVotes, false, null]);
    useUserState.mockReturnValue([{ displayName: "Test User" }]);
  });

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
    const dispatcherElement = screen.getByTestId("dispatcher-component");
    expect(dispatcherElement).toBeDefined();
  });

  test("log in", async () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeDefined();
  });

  it("uses mock data for events", () => {
    render(<App />);
    const title = screen.getByText(/Mock Event Votes for 2024/i);
    expect(title).toBeInTheDocument();
  });

  test("user can see voting results", () => {
    render(<App />);
    const event1Votes = screen.getByText(/Event 1 - 5 votes/i);
    const event2Votes = screen.getByText(/Event 2 - 3 votes/i);
    expect(event1Votes).toBeInTheDocument();
    expect(event2Votes).toBeInTheDocument();
  });

  test("user cannot vote more than once", async () => {
    render(<App />);
    const voteButton = screen.getByRole("button", {
      name: /Vote for Event 1/i,
    });
    fireEvent.click(voteButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /You have already voted for this event./i
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("shows Sign In if not logged in", () => {
    useUserState.mockReturnValue([null]);
    render(<App />);
    const button = screen.getByText(/Sign In/i);
    expect(button).toBeInTheDocument();
  });

  it("shows Sign Out if logged in", () => {
    render(<App />);
    const button = screen.getByText(/Sign Out/i);
    expect(button).toBeInTheDocument();
  });

  it("asks for data once with a schedule path", () => {
    render(<App />);
    expect(useData).toHaveBeenCalledTimes(1);
    expect(useData).toHaveBeenCalledWith("/schedule", expect.any(Function));
  });
});
