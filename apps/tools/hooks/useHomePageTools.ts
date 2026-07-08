// hooks/useHomePageTools.ts
import { useState, useEffect } from "react";
import { api } from "@repo/shared_modules/api";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

const STORAGE_SUFFIX = "tools_shortcut";
const UNAUTHENTICATED_STORAGE_KEY = `guest_${STORAGE_SUFFIX}`;


export const useHomePageTools = () => {
  const [homePageTools, setHomePageTools] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageKey, setStorageKey] = useState<string | null>(null);



  useEffect(() => {
    const init = async () => {
      if (typeof window === "undefined") {
        setIsLoaded(true);
        return;
      }

      let resolvedKey: string | null = null;

      try {
        if (isUserLoggedIn()) {
          const response = await api.getUser();
          const user = response.data.data;
          if (user?.mobile) {
            resolvedKey = `${user.mobile}_${STORAGE_SUFFIX}`;
          }
        }
      } catch (e) {
        console.error("Error fetching user for tools storage:", e);
      }

      // Use unauthenticated key if user is not logged in
      if (!resolvedKey) {
        resolvedKey = UNAUTHENTICATED_STORAGE_KEY;
      }

      setStorageKey(resolvedKey);

      const stored = localStorage.getItem(resolvedKey);

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const normalized = parsed
              .filter((id): id is string => typeof id === "string")
              .map((id) => id.replace(/-/g, "_"));
            setHomePageTools(normalized);
            setIsLoaded(true);
            return;
          }
        } catch (e) {
          console.error("Error parsing home page tools:", e);
        }
      }

      setIsLoaded(true);
    };

    void init();
  }, []);

  useEffect(() => {
    if (isLoaded && storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(homePageTools));
    }
  }, [homePageTools, isLoaded, storageKey]);

  const toggleHomePageTool = (toolId: string) => {
    setHomePageTools((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      } else {
        return [toolId, ...prev];
      }
    });
  };

  const isOnHomePage = (toolId: string) => homePageTools.includes(toolId);

  return { homePageTools, toggleHomePageTool, isOnHomePage, isLoaded };
};
