import { FC } from "react";
import Photo from "./Photo";
import { IPhoto } from "../App";

interface PhotosProps {
  albumId: string;
  photos: IPhoto[];
}

const Photos: FC<PhotosProps> = ({ albumId, photos }) => {
  return (
    <section>
      <h2 className={["text-3xl", "mb-2"].join(" ")}>Album {albumId} Photos</h2>
      <div
        className={[
          "grid",
          "grid-cols-2",
          "md:grid-cols-3",
          "lg:grid-cols-6",
          "gap-4",
          "animate-fade-in",
        ].join(" ")}
      >
        {photos
          .filter((photo) => photo.albumId === Number(albumId))
          .map(({ id, title, thumbnailUrl }) => (
            <Photo key={id} id={id} title={title} url={thumbnailUrl} />
          ))}
      </div>
    </section>
  );
};

export default Photos;
