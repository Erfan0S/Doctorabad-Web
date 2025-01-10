import { ModalProps } from "../../types/modals";
import ClubSingleGetCode from "../../../userSidePanel/modal_components/singleShowGetCodeModal";

type Props = ModalProps<{ code: string }>;

export const ClubSingleGetCodeModal = ({ data }: Props) => {
  return <ClubSingleGetCode title="دکترکلاب" code={data.code} />;
};
