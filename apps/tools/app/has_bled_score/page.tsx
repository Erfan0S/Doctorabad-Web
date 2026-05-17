import HasBledPage from '@/components/HasBLEDScorePage/HasBledPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('has_bled_score');

export default async function MedicinePage() {

  return <HasBledPage />;
}