import { useGetShortUrlsQuery } from "@/services/urlApi";
import AreaChart from "../AreaChart";
import PieChart from "../PieChart";
import TopPerformingLinksChart from "../URLAnalytics";

const ShortLinkAnalytics = () => {
  const { data } = useGetShortUrlsQuery();
  if (data)
    return (
      <div className="flex flex-col items-end justify-end p-10">
        <div className="w-[80%]">
          <h1 className="text-4xl font-bold mb-6 text-center text-white">
            Short Link Analytics
          </h1>
          <div className="flex flex-col gap-8 w-full items-center justify-center">
            <div className="flex justify-between w-full">
              <TopPerformingLinksChart urls={data} />
              <PieChart />
            </div>
            <AreaChart />
          </div>
        </div>
      </div>
    );
};

export default ShortLinkAnalytics;
