declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface User {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  role: "USER" | "ADMIN";
}

interface ApiResponse<T> {
  data: T;
  message: string;
  sucess: boolean;
}

interface AnalyticsData {
  timestamp: string;
  browser: string;
  device: string;
  location: string;
}

interface ShortenedURL {
  id: number;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  analytics: AnalyticsData[];
  expiresAt: string;
  qrCode: string;
}
