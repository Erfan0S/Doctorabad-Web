import { api } from "@/api/Api";
import { Banner } from "@/types/banner";
import { TileList } from "@repo/shared_modules/components";
import React from "react";

async function CollectionsList() {
  let sliders: Banner[] = (await api.getMainSliders()).data.data;

  console.log(sliders.filter((c) => c.location === 3));

  return (
    <TileList
      categories={sliders
        .filter((c) => c.location === 3)
        .map((c) => ({
          id: c.id,
          pic_url: c.pic_url,
          alt: c.title,
          objectFit: "cover",
        }))}
    />
  );
}

export default CollectionsList;
