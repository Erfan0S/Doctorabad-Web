import type { Metadata } from "next";
import ReactQueryProvider from "@/providers/ReactQueryProvider"; // ← اضافه شد

export const metadata: Metadata = {
  title: "Doctorabad Pharmacy",
  description: "داروخانه آنلاین Doctorabad",
  manifest: "/manifest.json",
  themeColor: "#0070f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body dir="rtl">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
