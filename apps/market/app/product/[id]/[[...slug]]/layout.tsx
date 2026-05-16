import { generateMarketProductMetaData } from "@/metadata/singleProduct";

export const generateMetadata = generateMarketProductMetaData;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
