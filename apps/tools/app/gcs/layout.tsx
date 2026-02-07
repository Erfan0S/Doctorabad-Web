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
        title="GCS"
        toolData={{ id: "gcs", title: "GCS" }}
      ></ToolsHeader>
      {children}
    </>
  );
}
