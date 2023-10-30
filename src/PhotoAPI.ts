const url = "https://jsonplaceholder.typicode.com/photos";

export const PhotoAPI = {
  get: async (albumId: string) => {
    try {
      const response = await fetch(`${url}?albumId=${albumId}`);
      if (!response.ok) {
        throw Error("Network error!");
      }
      const photos = await response.json();
      return photos;
    } catch (e) {
      throw Error("Network error!");
    }
  },
  getAll: async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error("Network error!");
      }
      const photos = await response.json();
      return photos;
    } catch (e) {
      throw Error("Network error!");
    }
  },
};
