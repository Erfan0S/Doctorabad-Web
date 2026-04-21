import style from './AppLinkSender.module.scss';

const AppLinkSender = () => {
  return (
    <section className={style.appLinkSender}>
      <div className="container">
        <div className={style.appLinkSenderWrapper}>
          <input type="text" placeholder="شماره موبایلتون چند بود!؟" />
          <button>ارسال لینک دانلود اپلیکیشن</button>
        </div>
      </div>
    </section>
  );
};

export default AppLinkSender;
