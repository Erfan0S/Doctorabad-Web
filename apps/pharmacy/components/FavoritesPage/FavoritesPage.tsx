"use client";

import { useEffect, useState, useCallback } from "react";
import { pharmacyApi } from "@/api/Api";
import MedicineList from "@/components/MedicineList/MedicineList";
import MedicineListSkeleton from "@/components/Skeletons/MedicineListSkeleton/MedicineListSkeleton";
import { Medicine, MedicineListResponse } from "@/types/pharmacy";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const res = await pharmacyApi.getFavoriteList();

      const response: MedicineListResponse = res.data.data;

      setFavorites(response ?? []);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  // چون API صفحه‌بندی ندارد فعلاً خالی می‌گذاریم
  const loadMore = useCallback(() => {}, []);

  if (loading) {
    return <MedicineListSkeleton count={8} />;
  }

  return (
    <div style={{ padding: "16px" }}>
      {favorites.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "40px", fontSize: "16px" }}>
          ❤️ هنوز دارویی به علاقه‌مندی‌ها اضافه نکرده‌اید
        </div>
      ) : (
        <MedicineList
          medicines={favorites}
          loading={false}
          hasMore={false}
          onLoadMore={loadMore}
        />
      )}
    </div>
  );
}
