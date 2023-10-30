import { useState, useEffect } from "react";
import { PhotoAPI } from "./PhotoAPI";
import AlbumForm from "./components/AlbumForm";
import Photos from "./components/Photos";

export interface IPhoto {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

/**
 * Check local storage and if photos are already saved, load them into memory
 * @returns the initial state for photos
 */
const pullFromLocalStorage = () => {
  const savedPhotos = localStorage.getItem("photos");
  let initialValue;
  if (savedPhotos === null) {
    initialValue = [];
  } else {
    initialValue = JSON.parse(savedPhotos);
  }
  return initialValue || [];
};

function App() {
  const [albumId, setAlbumId] = useState("1");
  const [photos, setPhotos] = useState(pullFromLocalStorage);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const fetchedPhotos = await PhotoAPI.getAll();
        // if the data in the API has changed, update the state and local storage
        if (JSON.stringify(photos) !== JSON.stringify(fetchedPhotos)) {
          setPhotos(fetchedPhotos);
          localStorage.setItem("photos", JSON.stringify(fetchedPhotos));
        }
      } catch (e) {
        setError("Network error!");
      }
    })();
  });

  const changeAlbumId = (id: string) => {
    // prevents clearing out the photos from the DOM if the user erases the album id input
    if (id === "") {
      id = "1";
    }
    setAlbumId(id);
  };

  return (
    <>
      <div id="wrapper" className={["p-4"].join(" ")}>
        <header className={["w-100"].join(" ")}>
          <h1
            className={[
              "text-center",
              "font-extrabold",
              "text-5xl",
              "py-12",
            ].join(" ")}
          >
            Photo Showcase
          </h1>
        </header>
        <main>
          <AlbumForm photos={photos} changeAlbumId={changeAlbumId} />
          {error ? (
            <h3 className="text-3xl text-red-700">Network error!</h3>
          ) : (
            <Photos albumId={albumId} photos={photos} />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
