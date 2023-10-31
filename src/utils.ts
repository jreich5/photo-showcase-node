import { IPhoto } from "./App";

/**
 * Takes in the array of photos and returns the number albums in the array
 * @param photos
 * @returns the total number of unique album ids for a given array of photos
 */
export const calculateNumberOfAlbums = (photos: IPhoto[]) => {
  return Array.from(new Set(photos.map(({ albumId }) => albumId))).length;
};
