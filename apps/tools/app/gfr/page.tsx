import GFRPage from '@/components/GFRPage/GFRPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('gfr');

export default async function MedicinePage() {

  return <GFRPage />;
}