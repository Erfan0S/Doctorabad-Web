import { AuthorizeClientPage } from "@/components/common/AuthorizeClientPage";
import { checkoutMetadata } from "@repo/core/metadata/checkout";

export const viewport = checkoutMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthorizeClientPage>{children}</AuthorizeClientPage>;
}
