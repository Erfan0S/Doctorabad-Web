import BMIPage from '@/components/BMIPage/BMIPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('bmi');

export default async function MedicinePage() {

  return <BMIPage />;
}