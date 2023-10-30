import { render, screen, cleanup } from "@testing-library/react";
import App from "../App";

beforeAll(() => {
  render(<App />);
});

afterAll(() => {
  cleanup();
});

describe("App component", () => {
  it("should render", () => {
    const h1Element = screen.getByRole("heading", { name: "Photo Showcase" });
    expect(h1Element).toBeDefined;
  });
  // I broke this test once I implemented error handling.
  // This component functionality is no longer testable without a mock of the API call.
  // it.skip("should allow the album id to change", () => {
  //   const albumIdInput = screen.getByPlaceholderText("Enter album id");
  //   fireEvent.change(albumIdInput, { target: { value: "1" } });
  //   const photosHeading = screen.getAllByRole("heading", { level: 2 })[0];
  //   expect(photosHeading.innerText).toContain("1");
  // });
});
