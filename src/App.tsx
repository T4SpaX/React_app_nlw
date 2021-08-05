import { BrowserRouter, Route, Switch } from "react-router-dom"

import { Home } from "./pages/Home";
import { Newroom } from "./pages/Newroom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

import {AuthContextProvider} from "./contexts/authContexts"

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={Newroom} />
          <Route path="/rooms/:id"  component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
