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
    <AuthorizeClientPage baseUrl={routePath.learnBasePath}>
      {children}
    </AuthorizeClientPage>
  );
}
