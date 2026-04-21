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
        title="Wells DVT"
        toolData={{ id: "wells_dvt", title: "Wells DVT" }}
      ></ToolsHeader>
      {children}
    </>
  );
}
