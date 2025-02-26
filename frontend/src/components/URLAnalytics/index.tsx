import { useGetShortUrlsQuery } from "@/services/urlApi";
import { ClicksData } from "../UrlClicksData";
import PieChart from "../PieChart";
import TopPerformingLinksChart from "../TopUrls";

const ShortLinkAnalytics = () => {
  const { data } = useGetShortUrlsQuery();
  if (data)
    return (
      <div className="flex flex-col ml-[420px] mt-12">
        <div className="flex flex-col mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Short Link Analytics
          </h1>
          <p className="text-sm md:text-base text-[#a1a1aa]">
            Get all the details of your short links
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-5 md:gap-10">
          <TopPerformingLinksChart urls={data} />
          <ClicksData />
          <PieChart />
        </div>
      </div>
    );
};

export default ShortLinkAnalytics;
