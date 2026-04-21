import ToolsHeader from "@/components/ToolsHeader/ToolsHeader";
import { HeaderType } from "@/types/tools";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolsHeader
        headerPageType={HeaderType.TOOL_DETAILS}
        title="Calcium Correction"
        toolData={{ id: "calcium_correction", title: "Calcium Correction" }}
      ></ToolsHeader>
      {children}
    </>
  );
}
