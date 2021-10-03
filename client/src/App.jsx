import "./App.scss";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Chat from "./chat/chat";
import Login from "./login/login";
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/chat" component={Chat} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
