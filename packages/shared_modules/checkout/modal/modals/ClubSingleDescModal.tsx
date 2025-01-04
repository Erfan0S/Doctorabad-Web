import { ModalProps } from '@/types/modals';
import ClubSingleDesc from '../sidePanel/club/singleShowDescModal';

type Props = ModalProps<{
  description: string;
}>;

export const ClubSingleDescModal = ({ data }: Props) => {
  return <ClubSingleDesc title="دکترکلاب" description={data.description} />;
};
