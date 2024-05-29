import { describe, expect, test, vi, beforeEach} from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Navigation from "./components/Navigation";
import AuthButton from "./components/Navigation";
import useFireBase from './utilities/firebase';
import { unsubscribe } from "diagnostics_channel";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { useData, useUserState } from './utilities/firebase';


vi.mock('hooks/useData', () => ({
  useData: vi.fn()
}));
// const mockVotes = {
//   "title": "Mock Event Votes for 2024",
//   "events": { }
// };
const mockVotes = {
  "title": "Mock Event Votes for 2024",
};
describe("App component tests", () => {
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

  test("should handle button click and display message", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    const message = await screen.findByText(/button clicked!/i);
    expect(message).toBeDefined();
  });

  test("log in", async () => {
      render(<App />);

      expect(screen.getByRole("button", {name: /Sign In/i})).toBeDefined();
  });

  // test("pulling the feed mock data", () => {
  //    const{fetchGroups} = useFireBase();
  //    vi.spyOn( useFireBase(),"fetchGroups" ).mockImplementation(()=> {
  //       const groupId = "aasdfb!2234";
  //       const unsubscribe = () => {};  // Mock unsubscribe function
  //       return unsubscribe;
  //    });
  //    render(<App />);
  //    expect().toHaveBeenCalled();

  // });

  it('uses mock data for events', () => {
    useData.mockReturnValue([mockVotes, false, true]);
    // useUserState.mockReturnValue([null]);
    render(<App />);
    const title = screen.getByText(/Mock Event Votes for 2024/i);
    expect(title).toBeInTheDocument();
  });
});



