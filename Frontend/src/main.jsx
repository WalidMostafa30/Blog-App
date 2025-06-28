import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "./services/axios-global.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
