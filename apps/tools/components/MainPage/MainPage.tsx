"use client";

import ToolCard from "@/components/ToolCard/ToolCard";
import { ALL_TOOLS } from "@/data/toolsData";
import ToolsHeader from "@/components/ToolsHeader/ToolsHeader"; // هدر شما
import { HeaderType } from "@/types/tools";
import styles from "./page.module.scss";

export default function ToolsListPage() {
  return (
    <div className={styles.container}>
      <ToolsHeader 
        headerPageType={HeaderType.OTHERS}
        title="ابزارهای من"
        toolData={{ id: "all-tools", title: "ابزارهای من" }}
      />
      
      <div style={{ padding: "16px", paddingBottom: "80px" }}>
        {ALL_TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
