export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface ShortenedURL {
  id: string;
  user_id: string;
  original_url: string;
  short_code: string;
  custom_slug?: string;
  created_at: string;
  expires_at?: string;
  total_clicks: number;
}

export interface ClickAnalytics {
  id: string;
  url_id: string;
  clicked_at: string;
  country: string;
  city: string;
  browser: string;
  device_type: string;
  referrer: string;
}
