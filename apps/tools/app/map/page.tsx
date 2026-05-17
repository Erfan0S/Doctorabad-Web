import MAPPage from '@/components/MAPPage/MAPPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('map');

export default async function MedicinePage() {

  return <MAPPage />;
}