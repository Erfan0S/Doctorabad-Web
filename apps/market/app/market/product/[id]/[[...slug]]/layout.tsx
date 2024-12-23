import { generateProductMetaData } from '@/metadata/singleProduct';

export const generateMetadata = generateProductMetaData;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="row">{children}</div>
    </div>
  );
}
