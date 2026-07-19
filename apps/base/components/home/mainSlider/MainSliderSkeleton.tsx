const dotCls = "h-2 w-2 rounded-full bg-[#e0e0e0] first:w-6 first:rounded";

const MainSliderSkeleton = () => {
  return (
    <section className="relative bg-white pb-6 pt-4">
      <div className="container">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#e0e0e0]">
          <div className="skeleton-shimmer" />
        </div>
        <div className="mt-2 flex justify-center gap-2">
          <span className={dotCls} />
          <span className={dotCls} />
          <span className={dotCls} />
        </div>
      </div>
    </section>
  );
};

export default MainSliderSkeleton;
