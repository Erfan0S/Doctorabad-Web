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
        title="CHA2DS2-VASC"
        toolData={{ id: "cha2ds2_vasc", title: "CHA2DS2-VASC" }}
      ></ToolsHeader>
      {children}
    </>
  );
}
