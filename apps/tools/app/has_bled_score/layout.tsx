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
        title="HAS-BLED Score"
        toolData={{ id: "has-bled-score", title: "HAS-BLED Score" }}
      ></ToolsHeader>
      {children}
    </>
  );
}
