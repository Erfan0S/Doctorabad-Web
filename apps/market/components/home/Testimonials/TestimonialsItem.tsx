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
    <div className="bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.15)] p-5">
      <div className="mb-4 flex items-center">
        <span className="font-semibold text-lg me-3">{title}</span>
      </div>
      <div className="leading-6 text-sm text-[#777]">
        <p className="h-36 line-clamp-6">{description}</p>
      </div>
      <div className="flex items-center">
        <Image
          src={user.avatar}
          alt={title}
          width={40}
          height={40}
          className="w-10 h-10 object-cover rounded-full me-3"
        />
        <div className="flex flex-col">
          <span className="text-xs font-semibold">{user.name}</span>
          <small className="text-[#33cc33] text-[10px] font-semibold">{user.position}</small>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsItem;
