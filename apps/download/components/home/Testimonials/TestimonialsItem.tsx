import Image, { StaticImageData } from 'next/image';
import style from './Testimonials.module.scss';

interface Props {
  title: string;
  description: string;
  user: {
    avatar: StaticImageData;
    name: string;
    position: string;
  };
}
const TestimonialsItem = ({ title, description, user }: Props) => {
  return (
    <div className={style.testimonialsItem}>
      <div className={style.testimonialsItemHeader}>
        <span>{title}</span>
      </div>
      <div className={style.testimonialsItemBody}>
        <p>{description}</p>
      </div>
      <div className={style.testimonialsItemFooter}>
        <Image src={user.avatar} alt={title} />
        <div>
          <span>{user.name}</span>
          <small>{user.position}</small>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsItem;
