import { generateProductMetaData } from "@/metadata/singleProduct";

export const generateMetadata = generateProductMetaData;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
