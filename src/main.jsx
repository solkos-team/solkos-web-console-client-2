import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import Coolers from "/src/pages/shell/clt";
import Alerts from "/src/pages/shell/alerts";
import Outlets from "/src/pages/shell/outlets";
import Panel from "/src/pages/shell/panel";
import Users from "/src/pages/shell/users";
import Fails from "/src/pages/shell/fails";
import Indicator from "/src/pages/shell/indicator";
import CoolerDetail from "./pages/shell/coolerDetail";
import Insights from "./pages/shell/insights";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <NotificationsProvider>
          <Router>
            <Routes>
              <Route path="" element={<App />}>
                <Route index element={<Insights />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/clt" element={<Coolers />} />
                <Route path="/coolerDetail" element={<CoolerDetail />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/fails" element={<Fails />} />
                <Route path="/indicator" element={<Indicator />} />
                <Route path="/outlets" element={<Outlets />} />
                <Route path="/panel" element={<Panel />} />
                <Route path="/users" element={<Users />} />
              </Route>
            </Routes>
          </Router>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
