import { useGetShortUrlsQuery } from "@/services/urlApi";
import AreaChart from "../AreaChart";
import PieChart from "../PieChart";
import TopPerformingLinksChart from "../URLAnalytics";
import { ClicksData } from "../ClicksData";

const ShortLinkAnalytics = () => {
  const { data } = useGetShortUrlsQuery();
  if (data)
    return (
      <div className="flex flex-col w-[80%] ml-[600px] p-10">
        <div className="w-full">
          <div className="flex flex-col mb-6">
            <h1 className="text-4xl font-bold text-white">
              Short Link Analytics
            </h1>
            <p className="text-[#a1a1aa]">
              Get all the details of your short links
            </p>
          </div>
          <div className="flex flex-col gap-10 w-full items-center justify-center">
            <div className="flex gap-5 w-full justify-center">
              <TopPerformingLinksChart urls={data} />
              <ClicksData />
              <PieChart />
            </div>
            <AreaChart />
          </div>
        </div>
      </div>
    );
};

export default ShortLinkAnalytics;
