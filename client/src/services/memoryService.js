const MEMORY_KEY = "memona_memories";
const SESSION_KEY = "memona_session";

const scopedKey = () => {
  const session = localStorage.getItem(SESSION_KEY);
  const user = session ? JSON.parse(session) : null;
  return `${MEMORY_KEY}_${user?.id || "guest"}`;
};

const seedMemories = () => [
  {
    id: `mem_${Date.now()}_1`,
    title: "Coastal Road Trip",
    description: "Sunset at Big Sur with family.",
    date: "2025-08-14",
    location: "Big Sur, California",
    tags: ["vacation", "family", "travel"],
    album: "travel",
    isMilestone: false,
    privacy: "private",
    createdAt: new Date().toISOString()
  },
  {
    id: `mem_${Date.now()}_2`,
    title: "Graduation Day",
    description: "Celebrated with friends after the ceremony.",
    date: "2024-05-30",
    location: "San Jose, California",
    tags: ["graduation", "milestone", "friends"],
    album: "milestones",
    isMilestone: true,
    privacy: "shared",
    createdAt: new Date().toISOString()
  }
];

const read = () => {
  const raw = localStorage.getItem(scopedKey());
  if (raw) return JSON.parse(raw);
  const seeded = seedMemories();
  localStorage.setItem(scopedKey(), JSON.stringify(seeded));
  return seeded;
};

const write = (memories) => {
  localStorage.setItem(scopedKey(), JSON.stringify(memories));
};

export const memoryService = {
  getMemories: async ({ search = "", tag = "", date = "" } = {}) => {
    const memories = read().sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
    const searchTerm = search.trim().toLowerCase();

    return memories.filter((m) => {
      const matchesTag = tag ? m.tags?.includes(tag) : true;
      const matchesDate = date ? (m.date || "").includes(date) : true;
      const matchesSearch = searchTerm
        ? [m.title, m.description, m.location, ...(m.tags || [])]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(searchTerm))
        : true;
      return matchesTag && matchesDate && matchesSearch;
    });
  },

  getMemory: async (id) => {
    return read().find((m) => m.id === id) || null;
  },

  createMemory: async (data) => {
    const memories = read();
    const memory = {
      id: `mem_${Date.now()}`,
      title: data.title || "Untitled Memory",
      description: data.description || "",
      date: data.date || new Date().toISOString().slice(0, 10),
      location: data.location || "",
      tags: data.tags || [],
      album: data.album || "",
      isMilestone: Boolean(data.isMilestone),
      privacy: data.privacy || "private",
      mediaCount: data.mediaCount || 0,
      createdAt: new Date().toISOString()
    };
    memories.unshift(memory);
    write(memories);
    return memory;
  },

  updateMemory: async (id, data) => {
    const memories = read();
    const idx = memories.findIndex((m) => m.id === id);
    if (idx < 0) return null;
    memories[idx] = { ...memories[idx], ...data, updatedAt: new Date().toISOString() };
    write(memories);
    return memories[idx];
  },

  deleteMemory: async (id) => {
    const next = read().filter((m) => m.id !== id);
    write(next);
    return true;
  },

  getRandomMemory: async () => {
    const list = read();
    if (!list.length) return null;
    return list[Math.floor(Math.random() * list.length)];
  }
};

