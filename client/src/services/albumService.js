const ALBUM_KEY = "memona_albums";
const SESSION_KEY = "memona_session";

const scopedKey = () => {
  const session = localStorage.getItem(SESSION_KEY);
  const user = session ? JSON.parse(session) : null;
  return `${ALBUM_KEY}_${user?.id || "guest"}`;
};

const defaultAlbums = () => [
  { id: "travel", name: "Travel Adventures", description: "Trips and new places", privacy: "shared", createdAt: new Date().toISOString() },
  { id: "family", name: "Family Moments", description: "Family celebrations and milestones", privacy: "private", createdAt: new Date().toISOString() },
  { id: "milestones", name: "Milestones", description: "Major life events", privacy: "private", createdAt: new Date().toISOString() }
];

const read = () => {
  const raw = localStorage.getItem(scopedKey());
  if (raw) return JSON.parse(raw);
  const seeded = defaultAlbums();
  localStorage.setItem(scopedKey(), JSON.stringify(seeded));
  return seeded;
};

const write = (albums) => {
  localStorage.setItem(scopedKey(), JSON.stringify(albums));
};

export const albumService = {
  getAlbums: async () => {
    return read().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getAlbum: async (id) => {
    return read().find((a) => a.id === id) || null;
  },

  createAlbum: async (data) => {
    const albums = read();
    const album = {
      id: `album_${Date.now()}`,
      name: data.name,
      description: data.description || "",
      privacy: data.privacy || "private",
      coverImage: data.coverImage || "",
      createdAt: new Date().toISOString()
    };
    albums.unshift(album);
    write(albums);
    return album;
  },

  updateAlbum: async (id, data) => {
    const albums = read();
    const idx = albums.findIndex((a) => a.id === id);
    if (idx < 0) return null;
    albums[idx] = { ...albums[idx], ...data, updatedAt: new Date().toISOString() };
    write(albums);
    return albums[idx];
  },

  deleteAlbum: async (id) => {
    write(read().filter((a) => a.id !== id));
    return true;
  }
};

