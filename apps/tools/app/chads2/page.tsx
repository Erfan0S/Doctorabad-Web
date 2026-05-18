import Chads2Page from '@/components/Chads2Page/Chads2Page';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('chads2');

export default async function MedicinePage() {

  return <Chads2Page />;
}