import { BrowserRouter, Route } from "react-router-dom"

import { Home } from "./pages/Home";
import { Newroom } from "./pages/Newroom";

import {AuthContextProvider} from "./contexts/authContexts"

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={Newroom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
