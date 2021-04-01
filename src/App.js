import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import LoginView from "./LoginView";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignupView from "./SignupView";
import PaletaView from "./PaletaView";

function App() {
  return (
  <Router className="root">
     <div style={{height:"100%"}}>
        <Switch>
          <Route path="/" exact>
            <SignupView />
          </Route>
          <Route path="/login" exact>
            <LoginView />
          </Route>
          <Route path="/paleta/:idPaleta" exact>
            <PaletaView />
          </Route>
          <Route path="/paleta" exact>
            <PaletaView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;