// hooks/useFavorites.ts
import { useState, useEffect } from "react";

const STORAGE_KEY = "user_favorite_tools";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // برای جلوگیری از هیدراتیشن ارور

  // بارگذاری اولیه از لوکال استوریج
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const normalized = parsed
            .filter((id): id is string => typeof id === "string")
            .map((id) => id.replace(/-/g, "_"));
          setFavorites(normalized);
        }
      } catch (e) {
        console.error("Error parsing favorites:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // ذخیره تغییرات در لوکال استوریج
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId); // حذف
      } else {
        return [...prev, toolId]; // اضافه
      }
    });
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  return { favorites, toggleFavorite,  isFavorite, isLoaded };
};
