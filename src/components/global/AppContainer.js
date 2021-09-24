import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const AppContainer = ({ children, history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      console.log("history changed");
    });
    return () => {
      unlisten();
    };
  }, []);

  return <div>{children}</div>;
};

export default withRouter(AppContainer);
