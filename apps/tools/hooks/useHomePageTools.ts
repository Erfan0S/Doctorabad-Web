// hooks/useHomePageTools.ts
import { useState, useEffect } from "react";

const STORAGE_KEY = "user_home_page_tools";

export const useHomePageTools = () => {
  const [homePageTools, setHomePageTools] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHomePageTools(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing home page tools:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(homePageTools));
    }
  }, [homePageTools, isLoaded]);

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
