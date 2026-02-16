"use client";

import ToolCard from "@/components/ToolCard/ToolCard";
import { ALL_TOOLS } from "@/data/toolsData";
import ToolsHeader from "@/components/ToolsHeader/ToolsHeader";
import { HeaderType } from "@/types/tools";
import { useHomePageTools } from "@/hooks/useHomePageTools";

export default function FavoritesPage() {
  const { homePageTools, isLoaded } = useHomePageTools();

  // ابزارهایی که برای نمایش در صفحه اصلی انتخاب شده‌اند
  const selectedTools = ALL_TOOLS.filter((tool) => homePageTools.includes(tool.id));

  return (
    <div>


      <div style={{ padding: "16px", paddingBottom: "80px" }}>
        {!isLoaded ? (
          <p style={{textAlign: 'center', marginTop: '20px'}}>در حال بارگذاری...</p>
        ) : selectedTools.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "40px", color: "#666" }}>
            <p>هنوز ابزاری برای نمایش در صفحه اصلی انتخاب نکرده‌اید.</p>
          </div>
        ) : (
          selectedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        )}
      </div>
    </div>
  );
}
