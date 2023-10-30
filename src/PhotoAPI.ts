import { IPhoto } from "./App";

const url = "https://jsonplaceholder.typicode.com/photos";

export const PhotoAPI = {
  get: async (albumId: string): Promise<IPhoto[]> => {
    const response = await fetch(`${url}?albumId=${albumId}`);
    if (!response.ok) {
      throw Error("Network error!");
    }
    const photos = await response.json();
    return photos;
  },
  getAll: async (): Promise<IPhoto[]> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error("Network error!");
    }
    const photos = await response.json();
    return photos;
  },
};
