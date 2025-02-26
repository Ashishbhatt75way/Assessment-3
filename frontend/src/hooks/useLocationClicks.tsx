import { useMemo } from "react";

interface locationClicksResult {
  location: string;
  clicks: number;
}

function useLocationClicks(data: ShortenedURL[]): locationClicksResult[] {
  return useMemo(() => {
    // Step 1: Aggregate clicks by location
    const aggregatedData = data.reduce((acc: Record<string, number>, item) => {
      const location = item.analytics[0].location.split(",")[0].trim();
      const clicks = item.clicks;

      if (!acc[location]) {
        acc[location] = 0;
      }
      acc[location] += clicks;

      return acc;
    }, {});

    const result = Object.keys(aggregatedData).map((location) => ({
      location,
      clicks: aggregatedData[location],
    }));

    result.sort((a, b) => b.clicks - a.clicks);

    return result;
  }, [data]);
}

export default useLocationClicks;
