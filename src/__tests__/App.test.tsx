import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";
import { PhotoAPI } from "../PhotoAPI";
import { photos1 } from "../mockPhotoAPIData";

const mockPhotoAPI = jest.fn();
PhotoAPI.getAll = mockPhotoAPI.mockReturnValue(Promise.resolve(photos1));

beforeEach(() => {
  localStorage.clear();
  render(<App />);
});

afterEach(() => {
  cleanup();
});

afterAll(() => {
  mockPhotoAPI.mockClear();
});

describe("App component", () => {
  it("should render", () => {
    waitFor(() => {
      const h1Element = screen.getByRole("heading", { name: "Photo Showcase" });
      expect(h1Element).toBeDefined();
    });
  });

  it("should display a heading with album number 1", () => {
    const h2Element = screen.getByRole("heading", { name: "Album 1 Photos" });
    expect(h2Element).toBeDefined;
  });

  it("should allow the album id to change", async () => {
    const albumIdInput = screen.getByPlaceholderText(
      "Enter album id"
    ) as HTMLInputElement;

    await userEvent.type(albumIdInput, "2");

    expect(albumIdInput).toBeDefined();
    await waitFor(() => {
      expect(albumIdInput.value).toBe("2");
      const photosHeading = screen.getAllByRole("heading", { level: 2 })[0];
      expect(photosHeading.innerHTML).toContain("2");
    });
  });

  it("should not allow the album id to change with invalid input", async () => {
    async function verifyAlbumIdHasNotChanged(keyboardInput: string) {
      const photosHeading = screen.getAllByRole("heading", {
        level: 2,
      })[0] as HTMLHeadingElement;

      expect(photosHeading.innerHTML).toContain("Album 1 Photos");

      const albumIdInput = screen.getByPlaceholderText(
        "Enter album id"
      ) as HTMLInputElement;

      userEvent.type(albumIdInput, keyboardInput);

      await waitFor(() => {
        expect(albumIdInput.value).toBe("1");
        expect(photosHeading.innerHTML).toContain("Album 1 Photos");
      });
    }
    await verifyAlbumIdHasNotChanged("10"); // out of range
    await verifyAlbumIdHasNotChanged("*"); // non-numeric input
    await verifyAlbumIdHasNotChanged(" "); // non-numeric input
    await verifyAlbumIdHasNotChanged("cat"); // non-numeric input
  });

  it("should update local storage with useEffect", async () => {
    localStorage.setItem(
      "photos",
      JSON.stringify([
        {
          albumId: 1,
          id: 1,
          title: "accusamus beatae ad facilis cum similique qui sunt",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        },
      ])
    );

    let storagePhotos = localStorage.getItem("photos");
    if (storagePhotos === null) {
      storagePhotos = "[]";
    }

    expect(JSON.parse(storagePhotos).length).toBe(1);

    const albumIdInput = screen.getByPlaceholderText(
      "Enter album id"
    ) as HTMLInputElement;

    await userEvent.type(albumIdInput, "1");

    storagePhotos = localStorage.getItem("photos") || "[]";

    expect(JSON.parse(storagePhotos).length).toBeGreaterThan(1);
  });
});
