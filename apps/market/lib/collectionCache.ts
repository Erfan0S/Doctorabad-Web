import { api } from "../api/Api";
import { CollectionListItem } from "@/types/collection";

let collectionMap: Record<string, string> | null = null;

export async function getCollectionMap(): Promise<Record<string, string>> {
  if (collectionMap) return collectionMap;

  try {
    let allCollections: CollectionListItem[] = [];
    let currentPage = 1;
    let lastPage = 1;

    do {
      const res = await api.getCollectionsList({ page: currentPage });
      const { data, meta } = res.data;

      if (data) {
        allCollections = [...allCollections, ...data];
      }
      lastPage = meta?.last_page || 1;
      currentPage++;
    } while (currentPage <= lastPage);

    collectionMap = {};
    for (const col of allCollections) {
      if (col?.id && col?.title) {
        collectionMap[String(col.id)] = col.title.trim();
      }
    }
  } catch (error) {
    console.error("Error fetching collections:", error);
    collectionMap = {};
  }

  return collectionMap;
}
