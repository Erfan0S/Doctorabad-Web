import { SelectFilter } from "@/components/Search/Filters/SelectFilter";
import React from "react";
import { ModalProps } from "@repo/core/types";
import Accordion from "@/components/accordion";

const SelectFilterModal = ({
  data,
  closeModal,
}: ModalProps<{
  title: string;
  items: { id: number; title: string }[];
  queryKey: string;
  singleSelection?: boolean;
}>) => {
  return <SelectFilter {...data} />;
};

export default SelectFilterModal;
