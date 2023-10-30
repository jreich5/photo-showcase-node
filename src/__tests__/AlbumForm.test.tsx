import { render, screen, cleanup } from "@testing-library/react";
import AlbumForm, { calculateNumberOfAlbums } from "../components/AlbumForm";

afterAll(() => {
  cleanup();
});

const photos1 = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 2,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
];

const photos2 = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 2,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
  {
    albumId: 3,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
];

describe("AlbumForm component", () => {
  const callback = () => {};
  beforeEach(() => {
    cleanup();
  });
  it("should render", () => {
    render(<AlbumForm photos={photos1} changeAlbumId={callback} />);
    const inputElement = screen.getByPlaceholderText("Enter album id");
    expect(inputElement).toBeDefined;
  });
  it("should have a label", () => {
    render(<AlbumForm photos={photos1} changeAlbumId={callback} />);
    const labelElement = screen.getByText("Search by album id");
    expect(labelElement).toBeDefined;
  });
  it("should have a label with the correct number of albums to pick from for 2 albums", () => {
    render(<AlbumForm photos={photos1} changeAlbumId={callback} />);
    const numberOfAlbums = 2;
    const labelElement = screen.getByText(
      new RegExp(`numbers 1-${numberOfAlbums}`) // <-------- From ChatGPT
    );
    expect(labelElement).toBeDefined();
    expect(labelElement.innerHTML).toBeDefined();
    expect(labelElement.innerHTML).toContain("2");
  });
  it("should have a label with the correct number of albums to pick from for 1 album", () => {
    render(<AlbumForm photos={photos2} changeAlbumId={callback} />);
    const numberOfAlbums = 3;
    const labelElement = screen.getByText(
      new RegExp(`numbers 1-${numberOfAlbums}`) // <-------- From ChatGPT
    );
    expect(labelElement).toBeDefined();
    expect(labelElement.innerHTML).toBeDefined();
    expect(labelElement.innerHTML).toContain("3");
  });
});

describe("calculateNumberOfAlbums", () => {
  it("should be defined", () => {
    expect(calculateNumberOfAlbums).toBeDefined();
  });
  it("should return 2 when passed photos1", () => {
    expect(calculateNumberOfAlbums(photos1)).toEqual(2);
  });
  it("should return 2 when passed photos1", () => {
    expect(calculateNumberOfAlbums(photos2)).toEqual(3);
  });
});
