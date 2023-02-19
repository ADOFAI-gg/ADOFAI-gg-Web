import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const usePageTracking = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    ReactGA.initialize(`${import.meta.env.VITE_GA_NUMBER}`);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
    }
  }, [initialized, location]);
};

export default usePageTracking;
