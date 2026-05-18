import GCSPage from '@/components/GCSPage/GCSPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('gcs');

export default async function MedicinePage() {

  return <GCSPage />;
}