import Image from "next/image";
import { CommentItem } from "@repo/core/types/product";
import defaultAvatar from "@/assets/img/avatars/01.png";
import kadKhodaAvatar from "@/assets/img/avatars/KADKHODA.png";

interface Props {
  comment: CommentItem;
}

const ProductCommentsItem: React.FC<Props> = ({ comment }) => {
  return (
    <>
      <div className="mb-3 flex w-[60%] items-end last-of-type:mb-0 max-md:w-[85%]">
        <div className="comment-avatar ml-3">
          <Image
            src={comment.user_avatar_url || defaultAvatar}
            alt={comment.user_name}
            width={45}
            height={45}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="comment-bubble before:absolute before:bottom-[9px] before:left-full before:z-[1] before:content-[''] before:[border-bottom:14px_solid_transparent] before:[border-left:9px_solid_#2aaadf] after:absolute after:bottom-[12px] after:left-full after:z-[2] after:content-[''] after:[border-bottom:9px_solid_transparent] after:[border-left:6px_solid_#fff]">
          <div className="mb-2 flex items-center justify-between text-[12px] text-gray">
            <span>{comment.user_name}</span>
            <span>{new Date(comment.created_at).toLocaleString("fa")}</span>
          </div>
          <div className="text-[13px] font-medium [&_p]:mb-0">
            <p>{comment.text}</p>
          </div>
        </div>
      </div>
      {comment.reply_text && (
        <div className="mb-3 mr-auto flex w-[60%] flex-row-reverse items-end last-of-type:mb-0 max-md:w-[85%]">
          <div className="comment-avatar mr-3">
            <Image
              src={kadKhodaAvatar}
              alt={"کدخدا"}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="comment-bubble before:absolute before:bottom-[9px] before:right-full before:z-[1] before:content-[''] before:[border-bottom:14px_solid_transparent] before:[border-right:9px_solid_#2aaadf] after:absolute after:bottom-[12px] after:right-full after:z-[2] after:content-[''] after:[border-bottom:9px_solid_transparent] after:[border-right:6px_solid_#fff]">
            <div className="mb-2 flex items-center justify-between text-[12px] text-gray">
              <span>کدخدای دکترآباد</span>
              <span>{new Date(comment.updated_at).toLocaleString("fa")}</span>
            </div>
            <div className="text-[13px] font-medium [&_p]:mb-0">
              <p>{comment.reply_text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCommentsItem;
