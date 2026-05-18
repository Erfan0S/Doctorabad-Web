import Image from "next/image";
import style from "./ProductCommentsItem.module.scss";
import { CommentItem } from "@repo/core/types/product";
import defaultAvatar from "@/assets/img/avatars/01.png";
import kadKhodaAvatar from "@/assets/img/avatars/KADKHODA.png";

interface Props {
  comment: CommentItem;
}

const ProductCommentsItem: React.FC<Props> = ({ comment }) => {
  return (
    <>
      <div className={style.productCommentsItem}>
        <div className={style.productCommentsItemAvatar}>
          <Image
            src={comment.user_avatar_url || defaultAvatar}
            alt={comment.user_name}
            width={45}
            height={45}
          />
        </div>
        <div className={style.productCommentsItemContent}>
          <div className={style.productCommentsItemContentHeader}>
            <span>{comment.user_name}</span>
            <span>{new Date(comment.created_at).toLocaleString("fa")}</span>
          </div>
          <div className={style.productCommentsItemContentComment}>
            <p>{comment.text}</p>
          </div>
        </div>
      </div>
      {comment.reply_text && (
        <div className={`${style.productCommentsItem} ${style.replay}`}>
          <div className={style.productCommentsItemAvatar}>
            <Image src={kadKhodaAvatar} alt={"کدخدا"} />
          </div>
          <div className={style.productCommentsItemContent}>
            <div className={style.productCommentsItemContentHeader}>
              <span>کدخدای دکترآباد</span>
              <span>{new Date(comment.updated_at).toLocaleString("fa")}</span>
            </div>
            <div className={style.productCommentsItemContentComment}>
              <p>{comment.reply_text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCommentsItem;
