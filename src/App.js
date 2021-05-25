import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import LoginView from "./LoginView";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignupView from "./SignupView";
import PaletaView from "./PaletaView";
import MisPaletasView from "./MisPaletasView";
import ExplorarView from "./ExplorarView";
import FavoritosView from "./FavoritosView";

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
          <Route path="/mispaletas" exact>
            <MisPaletasView />
          </Route>
          <Route path="/explorar" exact>
            <ExplorarView />
          </Route>
          <Route path="/favoritos" exact>
            <FavoritosView />
          </Route>
          <Route>
            <h1>Parece que te has perdido de página</h1>
            <h3>Vuelve a: <a href="http://localhost:3000/login#">Login</a></h3>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;