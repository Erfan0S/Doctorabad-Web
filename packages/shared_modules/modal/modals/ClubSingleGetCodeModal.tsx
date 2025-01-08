import { ModalProps } from '@/types/modals';
import ClubSingleGetCode from '../sidePanel/club/singleShowGetCodeModal';

type Props = ModalProps<{ code: string }>;

export const ClubSingleGetCodeModal = ({ data }: Props) => {
  return <ClubSingleGetCode title="دکترکلاب" code={data.code} />;
};
