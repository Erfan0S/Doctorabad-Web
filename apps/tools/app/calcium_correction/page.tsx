import CalciumCorrectionPage from '@/components/CalciumCorrectionPage/CalciumCorrectionPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('calcium_correction');

export default async function MedicinePage() {

  return <CalciumCorrectionPage />;
}