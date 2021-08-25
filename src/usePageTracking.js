import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const usePageTracking = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    ReactGA.initialize(`${process.env.REACT_APP_UA_NUMBER}`);
    setInitialized(true);
  }, []);
  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    }
  }, [initialized, location]);
};

export default usePageTracking;
