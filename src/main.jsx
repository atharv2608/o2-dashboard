import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import { Login, NotFound, VolunteerSignup } from "./pages";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store/store.js";

const router = <BrowserRouter>
<Routes>
  <Route path="/" element={<Layout />}>
    <Route path="" element={<App />} /> 
  </Route>
  <Route path="/login" element={<Login />} />
  <Route path="/signup/volunteer" element={<VolunteerSignup />} />
  <Route path="*" element={<NotFound />} />
</Routes>
</BrowserRouter>
  
let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {router}
    </PersistGate>
  </Provider>
);
