import React from "react";
import { useState, useMemo } from "react";
import { IPhoto } from "../App";
import { inputIsValid } from "../validation";
import { calculateNumberOfAlbums } from "../utils";

interface AlbumFormProps {
  changeAlbumId: (id: string) => void;
  photos: IPhoto[];
}

const AlbumForm = (props: AlbumFormProps) => {
  const { changeAlbumId, photos } = props;
  const [albumId, setAlbumId] = useState("");
  const numberOfAlbums = useMemo(
    () => calculateNumberOfAlbums(photos),
    [photos]
  );
  const processInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.currentTarget.value;
    if (id === "") {
      // allows the photos to be pre-populated with the first album if input is blank
      changeAlbumId("1");
      setAlbumId("");
      return;
    }
    const isValidInput = inputIsValid(id, 1, numberOfAlbums);
    if (isValidInput) {
      changeAlbumId(id);
      setAlbumId(id);
    }
  };
  return (
    <section className={["flex", "mb-12"].join(" ")}>
      <form
        className={["m-auto", "flex", "flex-col", "items-center"].join(" ")}
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label
            className="flex flex-col items-center font-bold"
            htmlFor="album-id"
          >
            <span className="">Search by album id</span>
            <span>(numbers 1-{numberOfAlbums})</span>
          </label>
        </div>
        <input
          className={[
            "p-2",
            "w-[8rem]",
            "border",
            "border-2",
            "rounded",
            "text-center",
          ].join(" ")}
          id="album-id"
          type="text"
          placeholder="Enter album id"
          value={albumId}
          onChange={processInputChange}
        />
      </form>
    </section>
  );
};

export default AlbumForm;
