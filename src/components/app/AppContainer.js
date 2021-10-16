import React from "react"; // useEffect
import { withRouter } from "react-router-dom";

const AppContainer = ({ children, history }) => {
  // useEffect(() => {
  //   let beforeHistory = history;

  //   const unlisten = history.listen(() => {
  //     console.log(beforeHistory);
  //     console.log(history);
  //     if (
  //       beforeHistory.location &&
  //       beforeHistory.location.pathname === "/levels"
  //     ) {
  //       beforeHistory.push({
  //         pathname: "/wa",
  //       });
  //     }

  //     beforeHistory = history.location;
  //   });

  //   return () => {
  //     unlisten();
  //   };
  // }, []);

  return <div className="container">{children}</div>;
};

export default withRouter(AppContainer);
// export default AppContainer;
