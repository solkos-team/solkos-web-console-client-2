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
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Login } from "./pages/main/login/Login.tsx";
import { RecoverPassword } from "./pages/main/recover/RecoverPassword.tsx";
import { NewPassword } from "./pages/main/newPassword/NewPassword.tsx";
import { MapInsights } from "./pages/shell/insights/MapInsights.tsx";
import { Insights as InsightsNS } from "./pages/shell/nuevosSegmentos/Insights/Insights.tsx";
import { clt as CltNS } from "./pages/shell/nuevosSegmentos/clt_n/clt.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MantineProvider>
      <ModalsProvider>
        <NotificationsProvider>
          <Router>
            <Routes>
              <Route path="" element={<Login />}></Route>
              <Route path="/home" element={<App />}>
                <Route index path="/home" element={<Insights />} />
                {/* Insights */}
                <Route path="/home/insights" element={<Insights />} />
                {/* Alertas */}
                <Route path="/home/alerts" element={<Alerts />} />
                {/* Fallas */}
                <Route path="/home/fails" element={<Fails />} />
                {/* Indicadores */}
                <Route path="/home/indicator" element={<Indicator />} />
                {/* Cooler life tracking */}
                <Route path="/home/clt" element={<Coolers />} />
                {/* Cooler detail */}
                {/* <Route path="/home/clt" element={<Coolers />} /> */}
                <Route path="/home/clt_n" element={<CltNS />} />
                <Route
                  path="/home/coolerDetail/:serial_number"
                  element={<CoolerDetail />}
                />
                {/* Puntos de venta */}
                <Route path="/home/outlets" element={<Outlets />} />
                {/* Tableros */}
                <Route path="/home/panel" element={<Panel />} />
                {/* colaboradores */}
                <Route path="/home/users" element={<Users />} />
                {/* Login */}
                <Route path="/home/login" element={<Login />} />
                <Route path="/home/grafica" element={<MapInsights />} />
              </Route>
            </Routes>
            <Routes>
              <Route path="/homeCallCenter" element={<App />}>
                <Route index path="/homeCallCenter" element={<Coolers />} />
                {/* Cooler detail */}
                <Route
                  path="/homeCallCenter/coolerDetail/:serial_number"
                  element={<CoolerDetail />}
                />
              </Route>
            </Routes>
          </Router>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  </Provider>
);
