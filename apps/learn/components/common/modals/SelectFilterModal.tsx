import { SelectFilter } from "@/components/Search/Filters/SelectFilter";
import React from "react";
import { ModalProps } from "@repo/core/types/modals";
import { FilterModalType } from "@/types/filters";

const SelectFilterModal = ({
  data,
  closeModal,
}: ModalProps<FilterModalType>) => {
  return <SelectFilter closeModal={closeModal} {...data} />;
};

export default SelectFilterModal;
