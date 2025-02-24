import { useState, useEffect } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
}

interface DeviceDetails {
  location: Location;
  browser: string | null;
  device: string | null;
}

const useDeviceDetails = (): DeviceDetails => {
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetails>({
    location: {
      latitude: null,
      longitude: null,
      address: null,
    },
    browser: null,
    device: null,
  });

  const getBrowserDetails = (): string => {
    const userAgent = navigator.userAgent;
    let browser = "Unknown";

    if (userAgent.indexOf("Firefox") > -1) {
      browser = "Mozilla Firefox";
    } else if (userAgent.indexOf("SamsungBrowser") > -1) {
      browser = "Samsung Internet";
    } else if (
      userAgent.indexOf("Opera") > -1 ||
      userAgent.indexOf("OPR") > -1
    ) {
      browser = "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
      browser = "Microsoft Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
      browser = "Microsoft Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
      browser = "Google Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
      browser = "Apple Safari";
    }

    return browser;
  };

  const getDeviceDetails = (): string => {
    const userAgent = navigator.userAgent;
    let device = "Unknown";

    if (/Android/i.test(userAgent)) {
      device = "Android";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      device = "iOS";
    } else if (/Windows/i.test(userAgent)) {
      device = "Windows";
    } else if (/Macintosh/i.test(userAgent)) {
      device = "Mac";
    } else if (/Linux/i.test(userAgent)) {
      device = "Linux";
    }

    return device;
  };

  async function getUserLocation(latitude: number, longitude: number) {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;
    try {
      const response = await fetch(weatherUrl);

      const data = await response.json();
      const location =
        data.location.name +
        ", " +
        data.location.region +
        ", " +
        data.location.country;

      return location;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }

  const getLocation = async (): Promise<void> => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const getWeatherData = await getUserLocation(latitude, longitude);
          setDeviceDetails((prevDetails) => ({
            ...prevDetails,
            location: {
              latitude,
              longitude,
              address: getWeatherData,
            },
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    setDeviceDetails((prevDetails) => ({
      ...prevDetails,
      browser: getBrowserDetails(),
      device: getDeviceDetails(),
    }));

    getLocation();
  }, []);

  return deviceDetails;
};

export default useDeviceDetails;
