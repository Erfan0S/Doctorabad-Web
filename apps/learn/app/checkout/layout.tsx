import { AuthorizeClientPage } from "@/components/common/AuthorizeClientPage";
import HomeHeader from "@/components/Header/HomeHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <>
    <HomeHeader  haveSearch={false}/>
    <div className="container">
      <AuthorizeClientPage>{children}</AuthorizeClientPage>
    </div>
  
  </>
  );
}
