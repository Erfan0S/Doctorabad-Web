import { authorizeServerPage } from "@repo/core/utils/authUtils";
import FavoritesPage from '@/components/FavoritesPage/FavoritesPage';

export default async function MedicinePage() {
  await authorizeServerPage();
  return <FavoritesPage />;
}