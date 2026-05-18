import ApgarPage from '@/components/ApgarPage/ApgarPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('apgar');

export default async function MedicinePage() {

  return <ApgarPage />;
}