import { AuthorizeClientPage } from "@repo/shared_modules/components";
import { PageHeader } from "@repo/shared_modules/headers";
import { checkoutMetadata } from "@repo/core/metadata/checkout";
import { routePath } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";

export const viewport = checkoutMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthorizeClientPage baseUrl={routePath.examBasePath}>
        <PageHeader app={Apps.EXAM} title="سوالات نشان‌دار من" />
        <div className="container">{children}</div>
      </AuthorizeClientPage>
    </>
  );
}
