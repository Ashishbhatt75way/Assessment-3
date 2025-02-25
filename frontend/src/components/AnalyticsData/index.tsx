import AreaChart from "../AreaChart";
import PieChart from "../PieChart";

const ShortLinkAnalytics = () => {
  return (
    <div className="w-full h-screen flex-col items-center justify-center flex">
      <h1 className="text-5xl mt-10 font-bold">Short Link Analytics</h1>
      <div className="pt-24 flex gap-8 items-center justify-center">
        <PieChart />
        <AreaChart />
      </div>
    </div>
  );
};

export default ShortLinkAnalytics;
