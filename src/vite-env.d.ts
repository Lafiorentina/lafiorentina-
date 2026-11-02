/// <reference types="vite/client" />

interface Window {
  umaiWidget?: {
    config: (options: { apiKey: string; widgetType: 'reservation' }) => void;
    openWidget: () => void;
  };
}
