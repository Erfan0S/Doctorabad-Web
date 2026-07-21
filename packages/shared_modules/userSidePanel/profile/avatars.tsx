import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../api/Api";
import { UserAvatar } from "@repo/core/types/user";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

interface Props {
  onAvatarSelect: (data: UserAvatar) => void;
}
const ProfileAvatars: React.FC<Props> = ({ onAvatarSelect }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["avatars"],
    queryFn: api.getAvatarList,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: ({ filename, url }: UserAvatar) => api.selectAvatar(filename),
    onMutate: onAvatarSelect,
  });

  return (
    <>
      <div className="flex flex-wrap justify-center gap-7 overflow-hidden">
        {data?.data.map((item) => (
          <Image
            key={item.filename || placeHolderDataUrl}
            src={item.url}
            width={75}
            height={75}
            alt="avatarImage"
            className="cursor-pointer rounded-full border border-solid border-[#c3c3c3c3] p-0.5 hover:border-[#f54f1a] hover:[transition:ease-in-out_0.1s]"
            onClick={() => mutate(item)}
          />
        ))}
      </div>
    </>
  );
};

export default ProfileAvatars;
