import Image from "next/image";
import { CommentItem, SingleProductComment } from "@repo/core/types/product";
import defaultAvatar from "@/assets/img/avatars/01.png";
import kadKhodaAvatar from "@/assets/img/avatars/KADKHODA.png";

// shared between the visitor comment and the admin reply
const HEADER_CLASS = "mb-2 flex items-center justify-between text-xs text-gray";
const COMMENT_CLASS = "text-[13px] font-medium [&_p]:mb-0";

interface Props {
  comment: CommentItem;
}

const ProductCommentsItem: React.FC<Props> = ({ comment }) => {
  return (
    <>
      <div className="market-comment-item">
        <div className="market-comment-avatar">
          <Image
            src={comment.user_avatar_url || defaultAvatar}
            alt={comment.user_name}
            width={45}
            height={45}
          />
        </div>
        <div className="market-comment-bubble">
          <div className={HEADER_CLASS}>
            <span>{comment.user_name}</span>
            <span>{new Date(comment.created_at).toLocaleString("fa")}</span>
          </div>
          <div className={COMMENT_CLASS}>
            <p>{comment.text}</p>
          </div>
        </div>
      </div>
      {comment.reply_text && (
        <div className="market-comment-item market-comment-item-reply">
          <div className="market-comment-avatar">
            <Image src={kadKhodaAvatar} alt={"کدخدا"} />
          </div>
          <div className="market-comment-bubble">
            <div className={HEADER_CLASS}>
              <span>کدخدای دکترآباد</span>
              <span>{new Date(comment.updated_at).toLocaleString("fa")}</span>
            </div>
            <div className={COMMENT_CLASS}>
              <p>{comment.reply_text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCommentsItem;
