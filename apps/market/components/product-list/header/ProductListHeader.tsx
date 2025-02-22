"use client";

import { ProductListType } from "@repo/core/types/product";
import { useParams } from "next/navigation";
import React from "react";
import ArchiveHeader from "./archive";
import { generateProductListMetaData } from "@/metadata/archiveProduct";
import style from "./ArchiveHeader.module.scss";

export const ProductListHeader = () => {
  const { type } = useParams();

  const [_, title] = (
    generateProductListMetaData({
      params: { type: type as ProductListType },
      searchParams: {},
    }).title as string
  ).split("|");

  switch (type) {
    case ProductListType.ARCHIVE:
      return <ArchiveHeader />;

    default:
      return <h1 className={style.pageTitle}>{title}</h1>;
  }
};
