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
        title="Maintenance Fluids"
        toolData={{ id: "maintenance_fluids", title: "Maintenance Fluids" }}
      ></ToolsHeader>
      {children}
    </>
  );
}
