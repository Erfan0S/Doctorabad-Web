"use client";

import ToolCard from "@/components/ToolCard/ToolCard";
import { ALL_TOOLS } from "@/data/toolsData";
import ToolsHeader from "@/components/ToolsHeader/ToolsHeader"; // هدر شما
import { HeaderType } from "@/types/tools";
import { useHomePageTools } from "@/hooks/useHomePageTools";

export default function ToolsListPage() {
  const { homePageTools, toggleHomePageTool, isLoaded } = useHomePageTools();

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <ToolsHeader
        headerPageType={HeaderType.OTHERS}
        title="ابزارهای من"
        toolData={{ id: "all-tools", title: "ابزارهای من" }}
      />
      
      <div className="px-4 pt-[10px]">
        {ALL_TOOLS.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            isOnHomePage={homePageTools.includes(tool.id)}
            onToggleHomePage={toggleHomePageTool}
            isLoaded={isLoaded}
          />
        ))}
      </div>
    </div>
  );
}
