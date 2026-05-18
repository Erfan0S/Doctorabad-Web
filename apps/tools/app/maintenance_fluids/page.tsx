import MaintenanceFluidsPage from '@/components/MaintenanceFluidsPage/MaintenanceFluidsPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('maintenance_fluids');

export default async function MedicinePage() {

  return <MaintenanceFluidsPage />;
}