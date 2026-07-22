import { api } from '@/api/Api';
import { HomeStatisticsType } from '@/types/homeStatistics';

const itemCls =
  "flex flex-1 flex-col items-center rounded-[20px] bg-[#f2f2f2] p-3 text-center [&_span]:text-[22px] [&_span]:font-semibold [&_span]:text-green [&_small]:text-base [&_small]:font-semibold [&_small]:text-[#999] max-[768px]:rounded-xl max-[768px]:[&_span]:text-base max-[768px]:[&_small]:text-xs max-[576px]:min-w-[85px]";

const Statistics = ({ statistic }: { statistic: HomeStatisticsType }) => {
  return (
    <section>
      <div className="container">
        <div className="flex gap-3 max-[768px]:gap-1 max-[576px]:flex-wrap">
          <div className={itemCls}>
            <span>{statistic.user_count}</span>
            <small>دکترآبادی‌ها</small>
          </div>
          <div className={itemCls}>
            <span>{statistic.order_count}</span>
            <small>سفارشات</small>
          </div>
          <div className={itemCls}>
            <span>{statistic.video_hours}</span>
            <small>ساعت‌ویدئو</small>
          </div>
          <div className={itemCls}>
            <span>{statistic.product_count}</span>
            <small>محصولات</small>
          </div>
          <div className={itemCls}>
            <span>{statistic.question_count}</span>
            <small>سوالات</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
