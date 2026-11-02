import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ReservationButton = () => {
  const { t } = useLanguage();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const script = document.getElementById('umai-widget-script');
    const handleReady = () => setIsReady(Boolean(window.umaiWidget));

    script?.addEventListener('load', handleReady);
    handleReady();

    return () => script?.removeEventListener('load', handleReady);
  }, []);

  const handleReservation = () => {
    if (!window.umaiWidget) return;

    window.umaiWidget.config({
      apiKey: '38732f99-01cd-41f6-aafa-dea832f8e7bb',
      widgetType: 'reservation',
    });
    window.umaiWidget.openWidget();
  };

  return (
    <button
      id="umai-reservation-button"
      type="button"
      onClick={handleReservation}
      disabled={!isReady}
      aria-haspopup="dialog"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-medium text-white shadow-lg transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60"
    >
      <CalendarDays size={20} aria-hidden="true" />
      {t('hero.cta')}
    </button>
  );
};

export default ReservationButton;
