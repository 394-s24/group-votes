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

describe("App component tests", () => {
  test('choosing options', async () => {
    render(<App />);
    const post_button = screen.getByRole("button", {name: /\+ Post/i})
    fireEvent.click(post_button);
    const event_button = screen.getByRole("option", {name: /event/i})
    fireEvent.click(event_button)
    expect(screen.getByText(/Event/i))
    expect(screen.getByText(/vote/i))
    expect(screen.getByText(/poll/i))
    expect(screen.getByText(/reminder/i))

  })
});





