import Cha2ds2VascPage from '@/components/Cha2ds2VascPage/Cha2ds2VascPage';
import { generateToolMetaData } from '@/metadata/singleTool';
import { Metadata } from 'next';

export const metadata: Metadata = generateToolMetaData('cha2ds2_vasc');

export default async function MedicinePage() {

  return <Cha2ds2VascPage />;
}