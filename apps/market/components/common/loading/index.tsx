import { Apps } from "@repo/core/types/general";
import { Loading as SharedLoading } from "@repo/shared_modules/components";

interface Props {
  size?: number;

  className?: string;
}
const Loading1: React.FC<Props> = (props) => {
  return <SharedLoading app={Apps.MARKET} {...props} />;
};

export default Loading1;
