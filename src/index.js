import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./store";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
