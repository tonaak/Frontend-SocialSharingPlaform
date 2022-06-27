import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";
import UserSignupPage from "../pages/UserSignupPage";
import TopBar from "../components/TopBar";

function App() {
  return (
    <div>
      <TopBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={UserSignupPage} />
          <Route path="/:username" component={UserPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
