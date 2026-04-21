import style from './Loading.module.scss';

interface Props {
  size?: number;

  className?: string;
}
const Loading: React.FC<Props> = ({ size = 20, className }) => {
  return <div className={`${style.loading} ${className}`} style={{ width: size, height: size }} />;
};

export default Loading;
