// hooks/useHomePageTools.ts
import { useState, useEffect } from "react";
import { api } from "@repo/shared_modules/api";

const FALLBACK_STORAGE_KEY = "user_home_page_tools";
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

      let resolvedKey = FALLBACK_STORAGE_KEY;

      try {
        const response = await api.getUser();
        const user = response.data.data;
        if (user?.mobile) {
          resolvedKey = `${user.mobile}_${STORAGE_SUFFIX}`;
        }
      } catch (e) {
        // اگر کاربر لاگین نباشد یا فراخوانی خطا بدهد، از کلید پیش‌فرض استفاده می‌کنیم
        console.error("Error fetching user for tools storage:", e);
      }

      setStorageKey(resolvedKey);

      let stored = localStorage.getItem(resolvedKey);

      // مهاجرت از کلید قدیمی به کلید جدید در صورت نیاز
      if (!stored && resolvedKey !== FALLBACK_STORAGE_KEY) {
        stored = localStorage.getItem(FALLBACK_STORAGE_KEY);
      }

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
