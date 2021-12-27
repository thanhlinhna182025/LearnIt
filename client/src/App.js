import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Routers, Switch, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
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
            <ProtectedRoute
              exact
              path="/about"
              component={About}
            ></ProtectedRoute>
          </Switch>
        </Routers>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
