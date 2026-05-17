import WellsPTEPage from '@/components/WellsPTEPage/WellsPTEPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('wells_pte');

export default async function MedicinePage() {

  return <WellsPTEPage />;
}