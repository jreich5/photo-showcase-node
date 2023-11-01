// import { describe, it, expect, afterAll } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Photos from "../components/Photos";
import { photos1 } from "../mockPhotoAPIData";

afterAll(() => {
  cleanup();
});

describe("Photos component", () => {
  it("should render", () => {
    render(<Photos photos={photos1} albumId="1" />);
    const h2Element = screen.getByRole("heading", { name: "Album 1 Photos" });
    expect(h2Element).toBeInTheDocument();
  });
});
