import { ModalProps } from "@repo/core/types";
import ClubSingleDesc from "../../../userSidePanel/modal_components/singleShowDescModal";

type Props = ModalProps<{
  description: string;
}>;

export const ClubSingleDescModal = ({ data }: Props) => {
  return <ClubSingleDesc title="دکترکلاب" description={data.description} />;
};
