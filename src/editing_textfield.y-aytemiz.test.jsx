import { describe, expect, test, vi, beforeEach} from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App component tests", () => {
  test('choosing options', async () => {
    render(<App />);
    const post_button = screen.getByRole("button", {name: /\+ Post/i})
    fireEvent.click(post_button);
    const vote_button = screen.getByRole("option", {name: /Poll/i})
    fireEvent.click(vote_button)
    fireEvent.click(vote_button)
   
    // Use getAllByRole to select the correct textbox
    const textboxes = screen.getAllByRole('textbox');
    const eventNameInput = textboxes.find(input => input.getAttribute('name') === 'eventName');
    const eventLocationInput = textboxes.find(input => input.getAttribute('name') === 'eventLocation');
    
    fireEvent.change(eventNameInput, { target: { value: 'Test Event' } });
    fireEvent.change(eventLocationInput, { target: { value: 'Test Location' } });
    
    expect(eventNameInput.value).toBe('Test Event');
    expect(eventLocationInput.value).toBe('Test Location');
    
    const send_button = screen.getByRole("button", {name: /Send To Group/i})
    fireEvent.click(send_button)
    expect(screen.getByText(/Event/i));



  })
});





