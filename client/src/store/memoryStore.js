import { create } from 'zustand';

export const useMemoryStore = create((set) => ({
  memories: [],
  setMemories: (memories) => set({ memories }),
  addMemory: (memory) => set((state) => ({ memories: [...state.memories, memory] })),
  removeMemory: (id) => set((state) => ({ 
    memories: state.memories.filter(m => m.id !== id) 
  })),
  updateMemory: (id, data) => set((state) => ({
    memories: state.memories.map(m => m.id === id ? { ...m, ...data } : m)
  })),
}));

