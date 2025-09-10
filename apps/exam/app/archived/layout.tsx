import { AuthorizeClientPage } from "@repo/shared_modules/components";
import { routePath } from "@repo/core/constants/routePath";
import { PageHeader } from "@repo/shared_modules/headers";
import { Apps } from "@repo/core/types/general";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthorizeClientPage baseUrl={routePath.examBasePath}>
        <PageHeader app={Apps.EXAM} title="آزمون های ساخته شده من" />
        <div className="container">{children}</div>
      </AuthorizeClientPage>
    </>
  );
}
