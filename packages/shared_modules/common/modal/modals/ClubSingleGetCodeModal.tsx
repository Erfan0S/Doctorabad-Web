import React from "react";
import { ModalProps } from "@repo/core/types";
import ClubSingleGetCode from "../../../userSidePanel/modal_components/singleShowGetCodeModal";

type Props = ModalProps<{ code: string }>;

export const ClubSingleGetCodeModal = ({ data }: Props) => {
  return <ClubSingleGetCode title="دکترکلاب" code={data.code} />;
};
