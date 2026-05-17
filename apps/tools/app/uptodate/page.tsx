import UpToDatePage from '@/components/UptodatePage/UptodatePage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('uptodate');

export default async function MedicinePage() {

  return <UpToDatePage />;
}