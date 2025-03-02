import { AuthorizeClientPage } from "@/components/common/AuthorizeClientPage";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <AuthorizeClientPage>{children}</AuthorizeClientPage>
    </div>
  );
}
