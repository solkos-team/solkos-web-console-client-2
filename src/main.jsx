import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import Coolers from "/src/pages/shell/clt";
import CoolersCC from "./pages/shell/clt_callCenter/Coolers_CC.tsx";
import Alerts from "/src/pages/shell/alerts";
import Outlets from "/src/pages/shell/outlets";
import Panel from "/src/pages/shell/panel";
import Users from "/src/pages/shell/users";
import Fails from "/src/pages/shell/fails";
import Indicator from "/src/pages/shell/indicator";
import CoolerDetail from "./pages/shell/coolerDetail";
import CoolerDetailCC from "./pages/shell/clt_callCenter/Detail_CC.tsx";
import Insights from "./pages/shell/insights";
import { Provider } from "react-redux";
import { store } from './app/Store.js'
import { Login } from "./pages/main/login/Login.tsx";
import { RecoverPassword } from "./pages/main/recover/RecoverPassword.tsx";
import { NewPassword } from "./pages/main/newPassword/NewPassword.tsx";
import { MapInsights } from "./pages/shell/insights/MapInsights.tsx";
import { Insights as InsightsNS } from "./pages/shell/nuevosSegmentos/Insights/Insights.tsx";
import { clt as CltNS } from "./pages/shell/nuevosSegmentos/clt_n/clt.tsx";
import { Detail } from "./pages/shell/nuevosSegmentos/clt_n/detail.tsx";
import { CoolView } from "./pages/shell/coolView/coolView.tsx";
import { MapResponsive } from "./components/mapInsights/MapResponsive.tsx";
import InsightsVault from "./pages/shell/vault/insightsVault/InsightsVault.tsx";
import Process1Vault from "./pages/shell/vault/process1/Process1Vault.tsx";
import { Process2Vault } from "./pages/shell/vault/process2/Process2Vault.tsx";

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
                <Route path="/home/insightsNS" element={<InsightsNS />} />
                <Route path="/home/insightsVault" element={<InsightsVault />} />
                {/* Alertas */}
                <Route path="/home/alerts" element={<Alerts />} />
                {/* Fallas */}
                <Route path="/home/fails" element={<Fails />} />
                {/* Indicadores */}
                <Route path="/home/indicator" element={<Indicator />} />
                {/* Proceso1 vault */}
                <Route path="/home/Process1Vault" element={<Process1Vault />} />
                {/* Proceso 2 vault */}
                <Route path="/home/Process2Vault" element={<Process2Vault />} />
                {/* Cooler life tracking */}
                <Route path="/home/clt" element={<Coolers />} />
                {/* Cooler detail */}
                <Route
                  path="/home/clt/:serial_number"
                  element={<CoolerDetail />}
                />
                {/* Nuevos segmentos */}
                <Route path="/home/clt_n" element={<CltNS />} />
                <Route path="/home/clt_n/:serial_number" element={<Detail />} />
                {/* Puntos de venta */}
                <Route path="/home/outlets" element={<Outlets />} />
                {/* Tableros */}
                <Route path="/home/panel" element={<Panel />} />
                {/* colaboradores */}
                <Route path="/home/users" element={<Users />} />
                {/* Login */}
                <Route path="/home/login" element={<Login />} />
                <Route path="/home/map" element={<MapResponsive />} />
                <Route path="/home/coolView" element={<CoolView />} />
              </Route>
            </Routes>
            <Routes>
              <Route path="/home/clt_callCenter" element={<App />}>
                <Route
                  index
                  path="/home/clt_callCenter"
                  element={<CoolersCC />}
                />
                {/* Cooler detail */}
                <Route
                  path="/home/clt_callCenter/:serial_number"
                  element={<CoolerDetailCC />}
                />
              </Route>
            </Routes>
          </Router>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  </Provider>
);
