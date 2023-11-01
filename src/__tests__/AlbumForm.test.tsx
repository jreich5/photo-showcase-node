import { render, screen, cleanup } from "@testing-library/react";
import { calculateNumberOfAlbums } from "../utils";
import "@testing-library/jest-dom";
import AlbumForm from "../components/AlbumForm";
import { photos1, photos2 } from "../mockPhotoAPIData";

afterEach(() => {
  cleanup();
});

describe("AlbumForm component", () => {
  const callback = () => {};
  beforeEach(() => {
    cleanup();
  });
  it("should render", () => {
    render(<AlbumForm photos={photos1} changeAlbumId={callback} />);
    const inputElement = screen.getByPlaceholderText("Enter album id");
    expect(inputElement).toBeInTheDocument();
  });
  it("should have a label", () => {
    render(<AlbumForm photos={photos1} changeAlbumId={callback} />);
    const labelElement = screen.getByText("Search by album id");
    expect(labelElement).toBeInTheDocument();
  });
  it("should have a label with the correct number of albums to pick from for 2 albums", () => {
    render(<AlbumForm photos={photos1} changeAlbumId={callback} />);
    const numberOfAlbums = 2;
    const labelElement = screen.getByText(
      new RegExp(`numbers 1-${numberOfAlbums}`) // <-------- From ChatGPT
    );
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("2");
  });
  it("should have a label with the correct number of albums to pick from for 1 album", () => {
    render(<AlbumForm photos={photos2} changeAlbumId={callback} />);
    const numberOfAlbums = 3;
    const labelElement = screen.getByText(
      new RegExp(`numbers 1-${numberOfAlbums}`) // <-------- From ChatGPT
    );
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("3");
  });
});

describe("calculateNumberOfAlbums", () => {
  it("should return 2 when passed photos1", () => {
    expect(calculateNumberOfAlbums(photos1)).toEqual(2);
  });
  it("should return 2 when passed photos1", () => {
    expect(calculateNumberOfAlbums(photos2)).toEqual(3);
  });
});
