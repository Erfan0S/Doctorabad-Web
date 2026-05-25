// hooks/useHomePageTools.ts
import { useState, useEffect } from "react";
import { api } from "@repo/shared_modules/api";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

const STORAGE_SUFFIX = "tools_shortcut";

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
        if (isUserLoggedIn()){

          const response = await api.getUser();
          const user = response.data.data;
          if (user?.mobile) {
            resolvedKey = `${user.mobile}_${STORAGE_SUFFIX}`;
          }
        }
      } catch (e) {
        console.error("Error fetching user for tools storage:", e);
      }

      if (!resolvedKey) {
        setIsLoaded(true);
        return;
      }

      setStorageKey(resolvedKey);

      const stored = localStorage.getItem(resolvedKey);

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const normalized = parsed
              .filter((id): id is string => typeof id === "string")
              .map((id) => id.replace(/-/g, "_"));
            setHomePageTools(normalized);
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
        return [...prev, toolId];
      }
    });
  };

  const isOnHomePage = (toolId: string) => homePageTools.includes(toolId);

  return { homePageTools, toggleHomePageTool, isOnHomePage, isLoaded };
};
