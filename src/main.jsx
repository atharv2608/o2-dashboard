import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./DashboardLayout.jsx";
import { Login, NotFound, SuccessRegister, VolunteerSignup } from "./pages";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store/store.js";
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import { DataBank } from "./components/index.js";

const router = (
  <BrowserRouter>
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="" element={<App />} />
          <Route path="/databank" element={<DataBank />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="registrations">
        <Route path="volunteers">
          <Route index element={<VolunteerSignup />} />
          <Route path="success" element={<SuccessRegister />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>{router}</PersistGate>
  </Provider>
);
