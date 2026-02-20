import { useCallback, useEffect, useMemo, useState } from "react";
import { memoryService } from "../services/memoryService";

export function useMemory() {
  const [memories, setMemories] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadMemories = useCallback(async (filters = {}) => {
    setIsLoading(true);
    const data = await memoryService.getMemories({
      search: filters.search ?? search,
      tag: filters.tag ?? tag,
      date: filters.date ?? date
    });
    setMemories(data);
    setIsLoading(false);
  }, [search, tag, date]);

  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  const tags = useMemo(() => {
    return [...new Set(memories.flatMap((m) => m.tags || []))];
  }, [memories]);

  const milestones = useMemo(() => memories.filter((m) => m.isMilestone), [memories]);

  const createMemory = useCallback(async (data) => {
    const created = await memoryService.createMemory(data);
    await loadMemories();
    return created;
  }, [loadMemories]);

  const removeMemory = useCallback(async (id) => {
    await memoryService.deleteMemory(id);
    await loadMemories();
  }, [loadMemories]);

  const getRandomMemory = useCallback(async () => {
    return memoryService.getRandomMemory();
  }, []);

  return {
    memories,
    milestones,
    tags,
    isLoading,
    search,
    tag,
    date,
    setSearch,
    setTag,
    setDate,
    loadMemories,
    createMemory,
    removeMemory,
    getRandomMemory
  };
}

