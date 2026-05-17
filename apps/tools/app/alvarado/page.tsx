import AlvaradoPage from '@/components/AlvaradoPage/AlvaradoPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('alvarado');

export default async function MedicinePage() {

  return <AlvaradoPage />;
}