import { useGetShortUrlsQuery } from "@/services/urlApi";

interface AnalyticsItem {
  browser: string;
}

interface ShortUrl {
  analytics: AnalyticsItem[];
}

interface BrowserData {
  browser: string;
  visitors: number;
}

interface UseGetBrowserDataResult {
  data: BrowserData[];
  isLoading: boolean;
  error: unknown;
}

const useGetBrowserData = (): UseGetBrowserDataResult => {
  const { data, isLoading, error } = useGetShortUrlsQuery();

  if (isLoading || error || !data) return { data: [], isLoading, error };

  const browserCounts = data
    .flatMap((item: ShortUrl) => item.analytics.map((items) => items.browser))
    .reduce<Record<string, number>>((acc, browser) => {
      acc[browser] = (acc[browser] || 0) + 1;
      return acc;
    }, {});

  const chartData = Object.entries(browserCounts).map(
    ([browser, visitors]) => ({
      browser,
      visitors,
    })
  );

  return { data: chartData, isLoading, error };
};

export default useGetBrowserData;
