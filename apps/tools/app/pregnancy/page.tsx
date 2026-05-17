import PregnancyPage from '@/components/PregnancyPage/PregnancyPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('pregnancy');

export default async function MedicinePage() {

  return <PregnancyPage />;
}