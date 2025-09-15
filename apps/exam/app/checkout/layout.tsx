import { AuthorizeClientPage } from "@repo/shared_modules/components";
import { PageHeader } from "@repo/shared_modules/headers";
import { checkoutMetadata } from "@repo/core/metadata/checkout";
import { routePath } from "@repo/core/constants/routePath";

export const viewport = checkoutMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthorizeClientPage baseUrl={routePath.examBasePath}>
        <PageHeader title="سبد خرید" />
        <div className="container">{children}</div>
      </AuthorizeClientPage>
    </>
  );
}
