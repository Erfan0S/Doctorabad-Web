import { api } from "@/api/Api";
import { HomeStatisticsType } from "@/types/homeStatistics";
import BagHappy from "@/assets/svg/bagHappy";
import Users from "@/assets/svg/users";
import Question from "@/assets/svg/question";
import TimeVideo from "@/assets/svg/timeVideo";
import Receipt from "@/assets/svg/receipt";

const sectionCls =
  "flex min-w-[180px] flex-row-reverse items-center justify-center gap-5 overflow-hidden rounded-[20px] bg-[#f2f2f2] p-3 !pl-[30px] text-center [flex:1_1_calc(20%_-_12px)] max-[992px]:min-w-[160px] max-[992px]:[flex:1_1_calc(33.333%_-_8px)] max-[768px]:min-w-[140px] max-[768px]:gap-4 max-[768px]:p-2 max-[768px]:[flex:1_1_calc(50%_-_4px)] max-[480px]:gap-3";
const rightCls =
  "flex min-w-0 flex-col [&_span]:overflow-hidden [&_span]:text-ellipsis [&_span]:text-[22px] [&_span]:font-bold [&_span]:leading-[1.2] [&_span]:text-green-base max-[768px]:[&_span]:text-lg [&_small]:text-base [&_small]:font-semibold [&_small]:leading-[1.3] [&_small]:text-[#999] max-[768px]:[&_small]:text-xs";
const leftCls =
  "flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-xl bg-white p-[10px] text-green-base max-[768px]:h-[42px] max-[768px]:w-[42px] max-[768px]:rounded-[10px] max-[768px]:p-2 [&_svg]:h-full [&_svg]:w-full [&_svg_path]:stroke-current";

const Statistics = ({ statistic }: { statistic: HomeStatisticsType }) => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-wrap gap-3 max-[768px]:gap-2">
          <div className={sectionCls}>
            <div className={rightCls}>
              <span>{statistic.user_count?.toLocaleString()}</span>
              <small>دکترآبادی‌ها</small>
            </div>
            <div className={leftCls}>
              <Users />
            </div>
          </div>
          <div className={sectionCls}>
            <div className={rightCls}>
              <span>{statistic.order_count?.toLocaleString()}</span>
              <small>سفارشات</small>
            </div>
            <div className={leftCls}>
              <Receipt />
            </div>
          </div>
          <div className={sectionCls}>
            <div className={rightCls}>
              <span>{statistic.video_hours?.toLocaleString()}</span>
              <small>ساعت‌ویدئو</small>
            </div>
            <div className={leftCls}>
              <TimeVideo />
            </div>
          </div>
          <div className={sectionCls}>
            <div className={rightCls}>
              <span>{statistic.product_count?.toLocaleString()}</span>
              <small>محصولات</small>
            </div>
            <div className={leftCls}>
              <BagHappy />
            </div>
          </div>
          <div className={sectionCls}>
            <div className={rightCls}>
              <span>{statistic.question_count?.toLocaleString()}</span>
              <small>سوالات</small>
            </div>
            <div className={leftCls}>
              <Question />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
