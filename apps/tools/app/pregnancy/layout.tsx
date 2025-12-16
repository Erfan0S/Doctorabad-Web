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
        title="Pregnancy"
        toolData={{ id: "pregnancy", title: "Pregnancy" }}
      ></ToolsHeader>
      {children}
    </>
  );
}
