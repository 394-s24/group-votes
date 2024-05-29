import { describe, expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

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

  test("should open modal on link click", async () => {
    render(<App />);
    const link = screen.getByRole("link", { name: /open modal/i });
    userEvent.click(link);

    const modal = await screen.findByRole("dialog");
    expect(modal).toBeDefined();
    expect(modal).toHaveTextContent(/this is a modal/i);
  });

  test("should update input value and submit form", async () => {
    render(<App />);
    const input = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    userEvent.type(input, "Hyunbin Lee");
    userEvent.click(submitButton);

    const successMessage = await screen.findByText(
      /form submitted successfully/i
    );
    expect(successMessage).toBeDefined();
    expect(successMessage).toHaveTextContent("Hyunbin Lee");
  });
});
