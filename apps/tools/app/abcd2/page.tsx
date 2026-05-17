import Abcd2Page from '@/components/Abcd2Page/Abcd2Page';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('abcd2');

export default async function MedicinePage() {

  return <Abcd2Page />;
}