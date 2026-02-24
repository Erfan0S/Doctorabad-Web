"use client";

import ToolCard from "@/components/ToolCard/ToolCard";
import { ALL_TOOLS } from "@/data/toolsData";
import ToolsHeader from "@/components/ToolsHeader/ToolsHeader";
import { HeaderType } from "@/types/tools";
import { useFavorites } from "@/hooks/useFavorites";
import { useHomePageTools } from "@/hooks/useHomePageTools";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();
  const {
    homePageTools,
    toggleHomePageTool,
    isLoaded: isHomeLoaded,
  } = useHomePageTools();

  // ابزارهایی که به عنوان علاقه‌مندی ذخیره شده‌اند
  const favoriteTools = ALL_TOOLS.filter((tool) => favorites.includes(tool.id));

  return (
    <div>

      <div style={{ padding: "16px", paddingBottom: "80px" }}>
        {!isLoaded ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            در حال بارگذاری...
          </p>
        ) : favoriteTools.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              color: "#666",
            }}
          >
            <p>هنوز ابزاری را به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
          </div>
        ) : (
          favoriteTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isOnHomePage={homePageTools.includes(tool.id)}
              onToggleHomePage={toggleHomePageTool}
              isLoaded={isHomeLoaded}
            />
          ))
        )}
      </div>
    </div>
  );
}
