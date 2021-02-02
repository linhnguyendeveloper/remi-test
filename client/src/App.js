import React from "react";
import Login from "./pages/Login/Login";
import "antd/dist/antd.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import ShareVideo from "./pages/Login/ShareVideo";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Layout style={{ minHeight: "100vh" }}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/share-video" />
              </Route>
              <Route path="/share-video" component={ShareVideo} exact />
            </Switch>
          </Layout>
        </Switch>
      </div>
    );
  }
}
export default App;
