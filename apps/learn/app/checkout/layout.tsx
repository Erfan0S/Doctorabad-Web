import { AuthorizeClientPage } from "@/components/common/AuthorizeClientPage";
import HomeHeader from "@/components/Header/HomeHeader";
import { checkoutMetadata } from "@repo/core/metadata/checkout";

export const viewport = checkoutMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeHeader haveSearch={false} />
      <div className="container">
        <AuthorizeClientPage>{children}</AuthorizeClientPage>
      </div>
    </>
  );
}
