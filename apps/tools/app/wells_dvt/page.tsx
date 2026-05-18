import WellsDvtPage from '@/components/WellsDvtPage/WellsDvtPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('wells_dvt');

export default async function MedicinePage() {

  return <WellsDvtPage />;
}