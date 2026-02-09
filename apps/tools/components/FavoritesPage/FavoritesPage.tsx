"use client";

import ToolCard from "@/components/ToolCard/ToolCard";
import { ALL_TOOLS } from "@/data/toolsData";
import ToolsHeader from "@/components/ToolsHeader/ToolsHeader";
import { HeaderType } from "@/types/tools";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  // فیلتر کردن ابزارها: فقط آنهایی که آی‌دی‌شان در لیست فیوریت است
  const favoriteTools = ALL_TOOLS.filter(tool => favorites.includes(tool.id));

  return (
    <div>


      <div style={{ padding: "16px", paddingBottom: "80px" }}>
        {!isLoaded ? (
          <p style={{textAlign: 'center', marginTop: '20px'}}>در حال بارگذاری...</p>
        ) : favoriteTools.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "40px", color: "#666" }}>
            <p>لیست علاقه‌مندی‌های شما خالی است.</p>
          </div>
        ) : (
          favoriteTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        )}
      </div>
    </div>
  );
}
