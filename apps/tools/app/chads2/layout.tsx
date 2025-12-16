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
        title="CHADS2"
        toolData={{ id: "chads2", title: "CHADS2" }}
      ></ToolsHeader>
      {children}
    </>
  );
}
