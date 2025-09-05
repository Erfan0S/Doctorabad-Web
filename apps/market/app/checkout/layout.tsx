import { AuthorizeClientPage } from "@repo/shared_modules/components";
import { checkoutMetadata } from "@repo/core/metadata/checkout";
import { routePath } from "@repo/core/constants/routePath";

export const viewport = checkoutMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <AuthorizeClientPage baseUrl={routePath.marketBasePath}>
        {children}
      </AuthorizeClientPage>
    </div>
  );
}
