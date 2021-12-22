import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Routers, Switch, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <Routers>
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRouter="login" />}
          ></Route>
          <Route
            exact
            path="/register"
            render={(props) => <Auth {...props} authRouter="register" />}
          ></Route>
          <ProtectedRoute
            exact
            path="/dashboard"
            component={Dashboard}
          ></ProtectedRoute>
        </Switch>
      </Routers>
    </AuthContextProvider>
  );
}

export default App;
