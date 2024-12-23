import { api } from '@/api/Api';
import style from './Statistics.module.scss';
import { HomeStatisticsType } from '@/types/homeStatistics';

const Statistics = ({ statistic }: { statistic: HomeStatisticsType }) => {
  return (
    <section className={style.statistics}>
      <div className="container">
        <div className={style.statisticsWrapper}>
          <div>
            <span>{statistic.user_count}</span>
            <small>دکترآبادی‌ها</small>
          </div>
          <div>
            <span>{statistic.order_count}</span>
            <small>سفارشات</small>
          </div>
          <div>
            <span>{statistic.video_hours}</span>
            <small>ساعت‌ویدئو</small>
          </div>
          <div>
            <span>{statistic.product_count}</span>
            <small>محصولات</small>
          </div>
          <div>
            <span>{statistic.question_count}</span>
            <small>سوالات</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
