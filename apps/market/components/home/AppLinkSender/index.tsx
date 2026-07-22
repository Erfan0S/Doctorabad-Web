const AppLinkSender = () => {
  return (
    <section className="py-10 max-[768px]:py-5">
      <div className="container">
        <div className="flex justify-center gap-3 rounded-3xl bg-[#f2f2f2] py-5 max-[768px]:flex-row-reverse max-[768px]:rounded-[20px] max-[768px]:p-2 max-[576px]:flex-col">
          <input type="text" placeholder="شماره موبایلتون چند بود!؟" className="w-[30%] rounded-2xl border-0 bg-white px-3 text-center text-base leading-[45px] focus:outline-none max-[768px]:w-full max-[768px]:flex-1 max-[768px]:text-sm" />
          <button className="cursor-pointer whitespace-nowrap rounded-2xl border-0 bg-green px-4 text-base font-semibold leading-[45px] text-white focus:outline-none max-[768px]:text-xs">ارسال لینک دانلود اپلیکیشن</button>
        </div>
      </div>
    </section>
  );
};

export default AppLinkSender;
