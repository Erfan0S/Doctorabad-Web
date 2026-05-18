import FENaPage from '@/components/FENaPage/FENaPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('fena');

export default async function MedicinePage() {

  return <FENaPage />;
}