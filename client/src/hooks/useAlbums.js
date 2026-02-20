import { useCallback, useEffect, useState } from "react";
import { albumService } from "../services/albumService";

export function useAlbums() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadAlbums = useCallback(async () => {
    setIsLoading(true);
    const data = await albumService.getAlbums();
    setAlbums(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

  const createAlbum = useCallback(async (data) => {
    const created = await albumService.createAlbum(data);
    await loadAlbums();
    return created;
  }, [loadAlbums]);

  return {
    albums,
    isLoading,
    loadAlbums,
    createAlbum
  };
}

