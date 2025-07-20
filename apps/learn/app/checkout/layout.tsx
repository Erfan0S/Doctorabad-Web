import { AuthorizeClientPage } from "@/components/common/AuthorizeClientPage";
import { PageHeader } from "@repo/shared_modules/headers";
import { checkoutMetadata } from "@repo/core/metadata/checkout";

export const viewport = checkoutMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title="سبد خرید" />
      <div className="container">
        <AuthorizeClientPage>{children}</AuthorizeClientPage>
      </div>
    </>
  );
}
