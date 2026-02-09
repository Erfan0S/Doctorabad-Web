import { authorizeServerPage } from "@repo/core/utils/authUtils";
import FavoritesPage from "@/components/FavoritesPage/FavoritesPage";
import { Suspense } from "react";

export default async function FavoritesPageRoute() {
  await authorizeServerPage();
  return (
    <Suspense>
      <FavoritesPage />
    </Suspense>
  );
}
