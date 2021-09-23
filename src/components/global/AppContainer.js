import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

class AppContainer extends React.Component {
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log("on route change");
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}
export default withRouter(AppContainer);

// const AppContainer = ({ history, children }) => {
//   useEffect(() => {
//     const unlisten = () => {
//       history.listen((location, action) => {
//         console.log("on route change");
//       });
//     };

//     unlisten();
//   });

//   return <div>{children}</div>;
// };

// export default withRouter(App);
