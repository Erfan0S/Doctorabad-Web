import { api } from "@/api/Api";
import style from "./Statistics.module.scss";
import { HomeStatisticsType } from "@/types/homeStatistics";
import BagHappy from "@/assets/svg/bagHappy";
import Users from "@/assets/svg/users";
import Question from "@/assets/svg/question";
import TimeVideo from "@/assets/svg/timeVideo";
import Receipt from "@/assets/svg/receipt";

const Statistics = ({ statistic }: { statistic: HomeStatisticsType }) => {
  return (
    <section className={style.statistics}>
      <div className="container">
        <div className={style.statisticsWrapper}>
          <div className={style.sectionStatistics}>
            <div className={style.rightSectionStatistics}>
              <span>{statistic.user_count?.toLocaleString()}</span>
              <small>دکترآبادی‌ها</small>
            </div>
            <div className={style.leftSectionStatistics}>
              <Users />
            </div>
          </div>
          <div className={style.sectionStatistics}>
            <div className={style.rightSectionStatistics}>
              <span>{statistic.order_count?.toLocaleString()}</span>
              <small>سفارشات</small>
            </div>
            <div className={style.leftSectionStatistics}>
              <Receipt />
            </div>
          </div>
          <div className={style.sectionStatistics}>
            <div className={style.rightSectionStatistics}>
              <span>{statistic.video_hours?.toLocaleString()}</span>
              <small>ساعت‌ویدئو</small>
            </div>
            <div className={style.leftSectionStatistics}>
              <TimeVideo />
            </div>
          </div>
          <div className={style.sectionStatistics}>
            <div className={style.rightSectionStatistics}>
              <span>{statistic.product_count?.toLocaleString()}</span>
              <small>محصولات</small>
            </div>
            <div className={style.leftSectionStatistics}>
              <BagHappy />
            </div>
          </div>
          <div className={style.sectionStatistics}>
            <div className={style.rightSectionStatistics}>
              <span>{statistic.question_count?.toLocaleString()}</span>
              <small>سوالات</small>
            </div>
            <div className={style.leftSectionStatistics}>
              <Question />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
