import {ModalProps} from "@repo/core/types/modals";
import {FilterModalType} from "@repo/core/types/filter";
import {SelectFilter} from "@repo/shared_modules/components";

const SelectModal = ({data, closeModal}: ModalProps<FilterModalType>) => {
  return <SelectFilter closeModal={closeModal} {...data} />;
};

export default SelectModal;
