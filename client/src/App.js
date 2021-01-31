import React from "react";
import Login from "./pages/Login/Login";
import "antd/dist/antd.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Layout style={{ minHeight: "100vh" }}>
           
              <Switch>
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>
                <Route path="/login" component={Login} exact />
                
              </Switch>
             
          </Layout>
        </Switch>
      </div>
    );
  }
}
export default App;