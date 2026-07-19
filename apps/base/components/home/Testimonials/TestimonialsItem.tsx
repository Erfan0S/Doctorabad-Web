import Image, { StaticImageData } from 'next/image';

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
    <div className="rounded-2xl bg-white p-5 shadow-[0_0_15px_rgba(0,0,0,0.15)]">
      <div className="mb-4 flex items-center">
        <span className="ml-3 text-lg font-semibold">{title}</span>
      </div>
      <div className="text-sm leading-6 text-[#777]">
        <p className="line-clamp-6 h-36">{description}</p>
      </div>
      <div className="flex items-center">
        <Image src={user.avatar} alt={title} className="ml-3 h-10 w-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <span className="text-xs font-semibold">{user.name}</span>
          <small className="text-[10px] font-semibold text-green-base">{user.position}</small>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsItem;
