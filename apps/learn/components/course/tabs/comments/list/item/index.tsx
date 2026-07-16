import Image from "next/image";
import { CommentItem } from "@repo/core/types/product";
import defaultAvatar from "@/assets/img/avatars/01.png";
import kadKhodaAvatar from "@/assets/img/avatars/KADKHODA.png";

interface Props {
  comment: CommentItem;
}

const itemClass = "mb-3 flex w-[60%] items-end last-of-type:mb-0 max-md:w-[85%]";
const avatarClass = "comment-avatar border-red";
const avatarImgClass = "h-full w-full rounded-full object-cover";
const bubbleClass = "comment-bubble border-red";
// ponytail: arrow pseudo-elements keep physical left/right on purpose — they
// must follow flex order (flipped via flex-row-reverse in replies), and the
// original scss was written with physical offsets for this RTL layout.
const bubbleArrows =
  "before:absolute before:bottom-[9px] before:left-full before:z-[1] before:border-solid before:border-b-[14px] before:border-l-[9px] before:border-b-transparent before:border-l-red before:content-[''] after:absolute after:bottom-[12px] after:left-full after:z-[2] after:border-solid after:border-b-[9px] after:border-l-[6px] after:border-b-transparent after:border-l-white after:content-['']";
const bubbleArrowsReply =
  "before:absolute before:bottom-[9px] before:right-full before:z-[1] before:border-solid before:border-b-[14px] before:border-r-[9px] before:border-b-transparent before:border-r-red before:content-[''] after:absolute after:bottom-[12px] after:right-full after:z-[2] after:border-solid after:border-b-[9px] after:border-r-[6px] after:border-b-transparent after:border-r-white after:content-['']";
const headerClass =
  "mb-2 flex items-center justify-between text-[12px] text-gray";
const commentClass = "text-[13px] font-medium [&_p]:mb-0";

const ProductCommentsItem: React.FC<Props> = ({ comment }) => {
  return (
    <>
      <div className={itemClass}>
        <div className={`${avatarClass} me-3`}>
          <Image
            className={avatarImgClass}
            src={comment.user_avatar_url || defaultAvatar}
            alt={comment.user_name}
            width={45}
            height={45}
          />
        </div>
        <div className={`${bubbleClass} ${bubbleArrows}`}>
          <div className={headerClass}>
            <span>{comment.user_name}</span>
            <span>{new Date(comment.created_at).toLocaleString("fa")}</span>
          </div>
          <div className={commentClass}>
            <p>{comment.text}</p>
          </div>
        </div>
      </div>
      {comment.reply_text && (
        <div className={`${itemClass} ms-auto flex-row-reverse`}>
          <div className={`${avatarClass} ms-3`}>
            <Image className={avatarImgClass} src={kadKhodaAvatar} alt={"کدخدا"} />
          </div>
          <div className={`${bubbleClass} ${bubbleArrowsReply}`}>
            <div className={headerClass}>
              <span>کدخدای دکترآباد</span>
              <span>{new Date(comment.updated_at).toLocaleString("fa")}</span>
            </div>
            <div className={commentClass}>
              <p>{comment.reply_text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCommentsItem;
