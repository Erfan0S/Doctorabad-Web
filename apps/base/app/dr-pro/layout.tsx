import { AuthorizeClientPage } from "@repo/shared_modules/components";
import { checkoutMetadata } from "@repo/core/metadata/checkout";
import { baseUrls } from "@repo/core/constants/routePath";
import { Metadata } from "next";
import { homeMetadata } from "@repo/core/metadata/home";
import { PersistQueryProvider } from "@repo/shared_modules";

// export const viewport = checkoutMetadata;
// export const metadata: Metadata = homeMetadata("/", "دکتر پرو");

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PersistQueryProvider>
        <AuthorizeClientPage baseUrl={baseUrls.base}>
          <div className="">{children}</div>
        </AuthorizeClientPage>
      </PersistQueryProvider>
    </>
  );
}
