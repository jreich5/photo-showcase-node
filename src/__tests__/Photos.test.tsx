// import { describe, it, expect, afterAll } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import Photos from "../components/Photos";

afterAll(() => {
  cleanup();
});

const photos = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
];

describe("Photos component", () => {
  it("should render", () => {
    render(<Photos photos={photos} albumId="1" />);
    const h2Element = screen.getByRole("heading", { name: "Album 1 Photos" });
    expect(h2Element).toBeDefined;
  });
});
