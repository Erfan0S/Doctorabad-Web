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
        title="Apgar"
        toolData={{ id: "apgar", title: "Apgar" }}
      ></ToolsHeader>
      {children}
    </>
  );
}
