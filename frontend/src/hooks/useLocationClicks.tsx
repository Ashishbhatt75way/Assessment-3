import { useGetShortUrlsQuery } from "@/services/urlApi";
import { useState, useEffect } from "react";

interface LocationClicks {
  location: string;
  clicks: number;
}

const useLocationClicks = () => {
  const { data: urlsData } = useGetShortUrlsQuery();
  const [locationClicks, setLocationClicks] = useState<LocationClicks[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const filteredUrls = urlsData?.filter((url) => url.clicks > 0);
      console.log(filteredUrls);
      if (!urlsData) {
        return;
      }

      fetchData();
    };
  }, []);

  return { locationClicks };
};

export default useLocationClicks;
