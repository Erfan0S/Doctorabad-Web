import MainPage from '@/components/MainPage/MainPage';
import { homeMetadata } from '@/metadata/home';
import { Metadata } from 'next';

export const metadata: Metadata = homeMetadata;

export default async function MedicinePage() {

  
  return <MainPage />;
}