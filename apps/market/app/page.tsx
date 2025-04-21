import { api } from "@/api/Api";
import { api as globalApi } from "@repo/shared_modules/api";
import AppLinkSender from "@/components/home/AppLinkSender";
import BigBanner from "@/components/home/BigBanner";
import { bigBannerData } from "@/components/home/BigBanner/big-banner-data";
import BlogSlider from "@/components/home/blogSlider";
import { blogSliderData } from "@/components/home/blogSlider/blog-slider-data";
import Companies from "@/components/home/companies";
import Intro from "@/components/home/intro";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";

export default async function Home() {
  const ProvidersList = (await api.getProviders()).data.data;
  const blogPosts = (await api.getMagazinePosts()).data.data;
  const statistic = (await globalApi.getHomeStatistics()).data.data;

  return (
    <>
      <Intro statistic={statistic} />
      <Statistics statistic={statistic} />
      {bigBannerData.map((item, index) => (
        <BigBanner key={index} {...item} />
      ))}
      <BlogSlider
        data={blogPosts}
        title="دکترمگ"
        archiveLink="https://mag.doctorabad.com/"
      />
      <Companies list={ProvidersList} />
      {/* <Testimonials />
      <AppLinkSender /> */}
    </>
  );
}
