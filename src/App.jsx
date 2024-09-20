import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Group,
  Navbar,
  Text,
  UnstyledButton,
  AppShell,
  createStyles,
  Menu,
  Header,
} from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import solkosSymbol from "./sampleData/solkosSymbol.svg";
import a1 from "../public/sampleData/a1.svg";
import a2 from "../public/sampleData/a2.svg";
import { addOrg } from "./app/organization";
import { fetchUniversalDetails } from "./utils/apiUtils";
import { Burger, Tooltip } from "@mantine/core";
import { MenuResponsive } from "./components/MenuResponsive/MenuResponsive";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      overflowY: "hidden",
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: 13,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : "#E6E6E6",
        color: theme.colorScheme === "dark" ? theme.white : "dark",
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === "dark" ? 5 : 7
            ],
        },
      },
    },

    user: {
      display: "block",
      width: "100%",
      padding: theme.spacing.md,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        borderRadius: 4,
      },
    },
  };
});

const routes = [
  {
    label: "Cooler Insights",
    icon: <img src={"../../sampleData/insights.svg"} />,
    initiallyOpened: true,
    links: [
      {
        label: "Insights",
        link: "/home/insights",
        icon: <img src={"../../sampleData/insig.svg"} alt="cooler"></img>,
      },
      {
        label: "Indicadores",
        link: "/home/indicator",
        icon: <img src={"../../sampleData/ind.svg"} alt="cooler"></img>,
      },
      {
        label: "Fallas",
        link: "/home/fails",
        icon: <img src={"../../sampleData/fails.svg"} alt="cooler"></img>,
      },
      {
        label: "Alertas",
        link: "/home/alerts",
        icon: <img src={"../../sampleData/alert.svg"} alt="cooler"></img>,
      },
    ],
  },
  {
    link: "/home/clt",
    label: "Cooler Life Tracking",
    icon: <img src={"../../sampleData/devices.svg"} />,
  },
  {
    link: "/home/outlets",
    label: "Puntos de venta",
    icon: <img src={"../../sampleData/pv.svg"} />,
  },
  {
    link: "/home/panel",
    label: "Tableros",
    icon: <img src={"../../sampleData/tableros.svg"} />,
  },
  {
    link: "/home/users",
    label: "Colaboradores",
    icon: <img src={"../../sampleData/user.svg"} />,
  },
];
const routesVault = [
  {
    label: "Cooler Insights",
    icon: <img src={"../../sampleData/insights.svg"} />,
    initiallyOpened: true,
    links: [
      {
        label: "Insights",
        link: "/home/insights",
        icon: <img src={"../../sampleData/insig.svg"} alt="cooler"></img>,
      },
      {
        label: "Indicadores",
        link: "/home/indicator",
        icon: <img src={"../../sampleData/ind.svg"} alt="cooler"></img>,
      },
      {
        label: "Fallas",
        link: "/home/fails",
        icon: <img src={"../../sampleData/fails.svg"} alt="cooler"></img>,
      },
      {
        label: "Alertas",
        link: "/home/alerts",
        icon: <img src={"../../sampleData/alert.svg"} alt="cooler"></img>,
      },
    ],
  },
  {
    link: "/home/clt",
    label: "Cooler Life Tracking",
    icon: <img src={"../../sampleData/devices.svg"} />,
  },
  {
    link: "/home/outlets",
    label: "Puntos de venta",
    icon: <img src={"../../sampleData/pv.svg"} />,
  },
  {
    link: "/home/panel",
    label: "Tableros",
    icon: <img src={"../../sampleData/tableros.svg"} />,
  },
  {
    link: "/home/users",
    label: "Colaboradores",
    icon: <img src={"../../sampleData/user.svg"} />,
  },
  {
    label: "Vault",
    icon: <img src={"../../sampleData/insights.svg"} />,
    initiallyOpened: true,
    links: [
      {
        label: "Procedimiento 1",
        link: "/home/Process1Vault",
        icon: <img src={"../../sampleData/ind.svg"} alt="cooler"></img>,
      },
      {
        label: "Procedimiento 2",
        link: "/home/Process2Vault",
        icon: <img src={"../../sampleData/fails.svg"} alt="cooler"></img>,
      },
    ],
  },
];

const routes1 = [
  {
    label: "Cooler Insights",
    icon: <img src={"../../sampleData/insights.svg"} />,
    initiallyOpened: true,
    links: [
      {
        label: "Insights",
        link: "/home/insights",
        icon: <img src={"../../sampleData/insig.svg"} alt="cooler"></img>,
      },
      {
        label: "Indicadores",
        link: "/home/indicator",
        icon: <img src={"../../sampleData/ind.svg"} alt="cooler"></img>,
      },
      {
        label: "Fallas",
        link: "/home/fails",
        icon: <img src={"../../sampleData/fails.svg"} alt="cooler"></img>,
      },
      {
        label: "Alertas",
        link: "/home/alerts",
        icon: <img src={"../../sampleData/alert.svg"} alt="cooler"></img>,
      },
    ],
  },
  {
    link: "/home/clt",
    label: "Cooler Life Tracking",
    icon: <img src={"../../sampleData/devices.svg"} />,
  },
  {
    link: "/home/outlets",
    label: "Puntos de venta",
    icon: <img src={"../../sampleData/pv.svg"} />,
  },

  {
    link: "/home/users",
    label: "Colaboradores",
    icon: <img src={"../../sampleData/user.svg"} />,
  },
];

const routes2 = [
  {
    link: "/home/clt_callCenter",
    label: "Cooler Life Tracking",
    icon: <img src={"../../sampleData/devices.svg"} />,
  },
  {
    link: "/home/users",
    label: "Colaboradores",
    icon: <img src={"../../sampleData/user.svg"} />,
  },
];
const routes3Coolview = [
  {
    label: "Cooler Insights",
    icon: <img src={"../../sampleData/insights.svg"} />,
    initiallyOpened: true,
    links: [
      {
        label: "Insights",
        link: "/home/insightsNS",
        icon: <img src={"../../sampleData/insig.svg"} alt="cooler"></img>,
      },
    ],
  },
  {
    link: "/home/clt_n",
    label: "Cooler Life Tracking",
    icon: <img src={"../../sampleData/devices.svg"} />,
  },
];
function App() {
  const Name = localStorage.getItem("USER") || "";
  const Role = localStorage.getItem("Role") || "";
  const { classes, cx } = useStyles();
  const [coolerInsightsOpen, setCoolerInsightsOpen] = useState(true);
  const [vaultOpen, setVaultOpen] = useState(false); // Estado separado para Vault
  const [data, setData] = useState([]);
  const [opened, setOpened] = useState(false); // state of menu
  const location = useLocation();
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const dt = useSelector((state) => state.organization);
  const dto = useSelector((state) => state.works);
  // console.log(Name);

  // *******************************
  const [updatedRoutes, setUpdatedRoutes] = useState(routes);
  const [menuResponsive, setMenuResponsive] = useState(false);
  useEffect(() => {
    if (Name === "Mayra Barrón Reséndiz" || Name === "Jose Ivan Perez Ugalde") {
      setUpdatedRoutes((prevRoutes) => [
        ...prevRoutes,
        {
          label: "Vault",
          icon: <img src={"../../sampleData/insights.svg"} />,
          initiallyOpened: true,
          links: [
            {
              label: "Vault Insights",
              link: "/home/insightsVault",
              icon: <img src={"../../sampleData/insig.svg"} alt="cooler"></img>,
            },
            {
              label: "Procedimiento 1",
              link: "/home/Process1Vault",
              icon: <img src={"../../sampleData/ind.svg"} alt="cooler"></img>,
            },
            {
              label: "Procedimiento 2",
              link: "/home/Process2Vault",
              icon: <img src={"../../sampleData/fails.svg"} alt="cooler"></img>,
            },
          ],
        },
      ]);
    }
  }, [Name]);

  // *******************************
  const openVault = () => {
    setVaultOpen(true);
  };

  const closeVault = () => {
    setVaultOpen(false);
  };

  const openCoolerInsights = () => {
    setCoolerInsightsOpen(true);
    setVaultOpen(false); // Asegurarse de cerrar Vault al abrir Cooler Insights
  };

  const stateM = sessionStorage.getItem("MenuState");
  stateM === undefined
    ? sessionStorage.setItem("MenuState", false)
    : sessionStorage.getItem("MenuState");
  const [opened2, setOpened2] = useState(true);
  const [opened3, setOpened3] = useState(true);
  const navigate = useNavigate();
  const closeCoolerInsights = () => {
    setCoolerInsightsOpen(false);
    setVaultOpen(false);
  };
  const fetctData = async () => {
    const datos = JSON.parse(sessionStorage.getItem("customers"));
    try {
      if (datos == null) {
        const data = await fetchUniversalDetails("customers");
        sessionStorage.setItem("customers", JSON.stringify(data));
        const datos = JSON.parse(sessionStorage.getItem("customers"));
        setData(data ?? datos);
      } else {
        setData(datos);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const status = sessionStorage.getItem("MenuState");
    status != opened2 ? sessionStorage.setItem("MenuState", opened2) : "";
  }, [opened2]);
  useEffect(() => {
    fetctData();
    setCoolerInsightsOpen(location.pathname === "/");
    const storage = localStorage.getItem("ORG");
    if (storage === null) {
      localStorage.setItem("ORG", "KOF");
      dispatch(addOrg());
    }
  }, [location.pathname]);

  const links =
    localStorage.getItem("ORG") === "CALL CENTER" ? (
      <>
        {routes2.map((item) => (
          <div key={item.label}>
            {item.links ? (
              <div style={{ whiteSpace: "nowrap" }}>
                <div
                  onClick={() => {
                    setCoolerInsightsOpen(!coolerInsightsOpen);
                  }}
                  className={cx(classes.link, {
                    [classes.linkActive]: coolerInsightsOpen,
                  })}
                >
                  {item.icon}
                  <span
                    style={{
                      marginLeft: 10,
                      display: opened2 === true ? "none" : "",
                    }}
                  >
                    {item.label}
                  </span>
                  {coolerInsightsOpen ? (
                    <img
                      src={a1}
                      style={{
                        marginLeft:
                          opened2 === true
                            ? 1
                            : opened2 == false && menuResponsive == true
                            ? 240
                            : 40,
                      }}
                    />
                  ) : (
                    <img
                      src={a2}
                      style={{
                        marginLeft:
                          opened2 === true
                            ? 1
                            : opened2 == false && menuResponsive == true
                            ? 240
                            : 40,
                      }}
                    />
                  )}
                </div>

                {coolerInsightsOpen && (
                  <div style={{ marginLeft: 20 }}>
                    {item.links.map((option) => (
                      <NavLink
                        to={option.link}
                        className={classes.link}
                        key={option.label}
                        activate={true.toString()}
                        onClick={closeCoolerInsights}
                      >
                        {option.icon && option.icon}{" "}
                        <span
                          style={{
                            marginLeft: 10,
                            display: opened2 === true ? "none" : "",
                          }}
                        >
                          {option.label}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  cx(classes.link, { [classes.linkActive]: isActive })
                }
                to={item.link || "/"}
                onClick={() => {
                  setActive(item.label);
                  closeCoolerInsights();
                }}
              >
                {item.icon}
                <span
                  style={{
                    marginLeft: 10,
                    display: opened2 === true ? "none" : "",
                  }}
                >
                  {item.label}
                </span>
              </NavLink>
            )}
          </div>
        ))}
      </>
    ) : localStorage.getItem("ORG") === "IMBERA HEALTH" ? (
      <>
        {routes3Coolview.map((item) => (
          <div key={item.label}>
            {item.label === "Cooler Insights" && item.links ? (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tooltip label={item.label}>
                  <div
                    onClick={() => {
                      setCoolerInsightsOpen(!coolerInsightsOpen);
                    }}
                    className={cx(classes.link, {
                      [classes.linkActive]: coolerInsightsOpen,
                    })}
                  >
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                    {coolerInsightsOpen ? (
                      <img
                        src={a1}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    ) : (
                      <img
                        src={a2}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
                {coolerInsightsOpen && (
                  <div style={{ marginLeft: opened2 === true ? 5 : 20 }}>
                    {item.links.map((option) => (
                      <NavLink
                        to={option.link}
                        className={classes.link}
                        key={option.label}
                        activate={true.toString()} // Convert boolean to string
                        onClick={closeCoolerInsights} // Cierra Cooler Insights al hacer clic en una subruta
                      >
                        <Tooltip label={option.label}>
                          <div>
                            {option.icon && option.icon}{" "}
                            <span
                              style={{
                                marginLeft: 10,
                                display: opened2 === true ? "none" : "",
                              }}
                            >
                              {option.label}
                            </span>
                          </div>
                        </Tooltip>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : item.label === "Vault" && item.links ? (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tooltip label={item.label}>
                  <div
                    onClick={() => {
                      setVaultOpen(!vaultOpen);
                    }}
                    className={cx(classes.link, {
                      [classes.linkActive]: vaultOpen,
                    })}
                  >
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                    {vaultOpen ? (
                      <img
                        src={a1}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    ) : (
                      <img
                        src={a2}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
                {vaultOpen && (
                  <div style={{ marginLeft: opened2 === true ? 5 : 20 }}>
                    {item.links.map((option) => (
                      <NavLink
                        to={option.link}
                        className={classes.link}
                        key={option.label}
                        activate={true.toString()} // Convert boolean to string
                        onClick={closeCoolerInsights} // Cierra Cooler Insights al hacer clic en una subruta
                      >
                        <Tooltip label={option.label}>
                          <div>
                            {option.icon && option.icon}{" "}
                            <span
                              style={{
                                marginLeft: 10,
                                display: opened2 === true ? "none" : "",
                              }}
                            >
                              {option.label}
                            </span>
                          </div>
                        </Tooltip>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  cx(classes.link, { [classes.linkActive]: isActive })
                }
                to={item.link || "/"}
                onClick={() => {
                  setActive(item.label);
                  closeCoolerInsights();
                }}
              >
                <Tooltip label={item.label}>
                  <div>
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </Tooltip>
              </NavLink>
            )}
          </div>
        ))}
      </>
    ) : Name === "Mayra Barrón Reséndiz" ||
      Name === "Jose Ivan Perez Ugalde" ||
      Name === "Alberto Alvarez" ? (
      <>
        {routesVault.map((item) => (
          <div key={item.label}>
            {item.label === "Cooler Insights" && item.links ? (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tooltip label={item.label}>
                  <div
                    onClick={() => {
                      setCoolerInsightsOpen(!coolerInsightsOpen);
                    }}
                    className={cx(classes.link, {
                      [classes.linkActive]: coolerInsightsOpen,
                    })}
                  >
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                    {coolerInsightsOpen ? (
                      <img
                        src={a1}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    ) : (
                      <img
                        src={a2}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
                {coolerInsightsOpen && (
                  <div style={{ marginLeft: opened2 === true ? 5 : 20 }}>
                    {item.links.map((option) => (
                      <NavLink
                        to={option.link}
                        className={classes.link}
                        key={option.label}
                        activate={true.toString()} // Convert boolean to string
                        onClick={closeCoolerInsights} // Cierra Cooler Insights al hacer clic en una subruta
                      >
                        <Tooltip label={option.label}>
                          <div>
                            {option.icon && option.icon}{" "}
                            <span
                              style={{
                                marginLeft: 10,
                                display: opened2 === true ? "none" : "",
                              }}
                            >
                              {option.label}
                            </span>
                          </div>
                        </Tooltip>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : item.label === "Vault" && item.links ? (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tooltip label={item.label}>
                  <div
                    onClick={() => {
                      setVaultOpen(!vaultOpen);
                    }}
                    className={cx(classes.link, {
                      [classes.linkActive]: vaultOpen,
                    })}
                  >
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                    {vaultOpen ? (
                      <img
                        src={a1}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    ) : (
                      <img
                        src={a2}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
                {vaultOpen && (
                  <div style={{ marginLeft: opened2 === true ? 5 : 20 }}>
                    {item.links.map((option) => (
                      <NavLink
                        to={option.link}
                        className={classes.link}
                        key={option.label}
                        activate={true.toString()} // Convert boolean to string
                        onClick={closeCoolerInsights} // Cierra Cooler Insights al hacer clic en una subruta
                      >
                        <Tooltip label={option.label}>
                          <div>
                            {option.icon && option.icon}{" "}
                            <span
                              style={{
                                marginLeft: 10,
                                display: opened2 === true ? "none" : "",
                              }}
                            >
                              {option.label}
                            </span>
                          </div>
                        </Tooltip>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  cx(classes.link, { [classes.linkActive]: isActive })
                }
                to={item.link || "/"}
                onClick={() => {
                  setActive(item.label);
                  closeCoolerInsights();
                }}
              >
                <Tooltip label={item.label}>
                  <div>
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </Tooltip>
              </NavLink>
            )}
          </div>
        ))}
      </>
    ) : localStorage.getItem("ORG") === "KOF" ||
      localStorage.getItem("ORG") === "KOF Colombia" ||
      localStorage.getItem("ORG") === "KOF Guatemala" ||
      localStorage.getItem("ORG") === "ECO" ? (
      <>
        {routes.map((item) => (
          <div key={item.label}>
            {item.label === "Cooler Insights" && item.links ? (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tooltip label={item.label}>
                  <div
                    onClick={() => {
                      setCoolerInsightsOpen(!coolerInsightsOpen);
                    }}
                    className={cx(classes.link, {
                      [classes.linkActive]: coolerInsightsOpen,
                    })}
                  >
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                    {coolerInsightsOpen ? (
                      <img
                        src={a1}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    ) : (
                      <img
                        src={a2}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
                {coolerInsightsOpen && (
                  <div style={{ marginLeft: opened2 === true ? 5 : 20 }}>
                    {item.links.map((option) => (
                      <NavLink
                        to={option.link}
                        className={classes.link}
                        key={option.label}
                        activate={true.toString()} // Convert boolean to string
                        onClick={closeCoolerInsights} // Cierra Cooler Insights al hacer clic en una subruta
                      >
                        <Tooltip label={option.label}>
                          <div>
                            {option.icon && option.icon}{" "}
                            <span
                              style={{
                                marginLeft: 10,
                                display: opened2 === true ? "none" : "",
                              }}
                            >
                              {option.label}
                            </span>
                          </div>
                        </Tooltip>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : item.label === "Vault" && item.links ? (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tooltip label={item.label}>
                  <div
                    onClick={() => {
                      setVaultOpen(!vaultOpen);
                    }}
                    className={cx(classes.link, {
                      [classes.linkActive]: vaultOpen,
                    })}
                  >
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                    {vaultOpen ? (
                      <img
                        src={a1}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    ) : (
                      <img
                        src={a2}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
                {vaultOpen && (
                  <div style={{ marginLeft: opened2 === true ? 5 : 20 }}>
                    {item.links.map((option) => (
                      <NavLink
                        to={option.link}
                        className={classes.link}
                        key={option.label}
                        activate={true.toString()} // Convert boolean to string
                        onClick={closeCoolerInsights} // Cierra Cooler Insights al hacer clic en una subruta
                      >
                        <Tooltip label={option.label}>
                          <div>
                            {option.icon && option.icon}{" "}
                            <span
                              style={{
                                marginLeft: 10,
                                display: opened2 === true ? "none" : "",
                              }}
                            >
                              {option.label}
                            </span>
                          </div>
                        </Tooltip>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  cx(classes.link, { [classes.linkActive]: isActive })
                }
                to={item.link || "/"}
                onClick={() => {
                  setActive(item.label);
                  closeCoolerInsights();
                }}
              >
                <Tooltip label={item.label}>
                  <div>
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </Tooltip>
              </NavLink>
            )}
          </div>
        ))}
      </>
    ) : (
      <>
        {routes1.map((item) => (
          <div key={item.label}>
            {item.links ? (
              <div style={{ whiteSpace: "nowrap" }}>
                <Tooltip label={item.label}>
                  <div
                    onClick={() => {
                      setCoolerInsightsOpen(!coolerInsightsOpen);
                    }}
                    className={cx(classes.link, {
                      [classes.linkActive]: coolerInsightsOpen,
                    })}
                  >
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                    {coolerInsightsOpen ? (
                      <img
                        src={a1}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    ) : (
                      <img
                        src={a2}
                        style={{
                          marginLeft:
                            opened2 === true
                              ? 1
                              : opened2 == false && menuResponsive == true
                              ? 240
                              : 40,
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
                {coolerInsightsOpen && (
                  <div style={{ marginLeft: opened2 === true ? 5 : 20 }}>
                    {item.links.map((option) => (
                      <NavLink
                        to={option.link}
                        className={classes.link}
                        key={option.label}
                        activate={true.toString()} // Convert boolean to string
                        onClick={closeCoolerInsights} // Cierra Cooler Insights al hacer clic en una subruta
                      >
                        <Tooltip label={option.label}>
                          <div>
                            {option.icon && option.icon}{" "}
                            <span
                              style={{
                                marginLeft: 10,
                                display: opened2 === true ? "none" : "",
                              }}
                            >
                              {option.label}
                            </span>
                          </div>
                        </Tooltip>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  cx(classes.link, { [classes.linkActive]: isActive })
                }
                to={item.link || "/"}
                onClick={() => {
                  setActive(item.label);
                  closeCoolerInsights();
                }}
              >
                <Tooltip label={item.label}>
                  <div>
                    {item.icon}
                    <span
                      style={{
                        marginLeft: 10,
                        display: opened2 === true ? "none" : "",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </Tooltip>
              </NavLink>
            )}
          </div>
        ))}
      </>
    );
  padding: opened2;

  const saveOrganization = (ORG) => {
    if (ORG) {
      localStorage.setItem("ORG", ORG);
      localStorage.setItem("PATH", "[]");
      dispatch(addOrg());
      setOpened(false);
    }
  };
  const validaUser = localStorage.getItem("RO0T");
  const array = Name.split(" ");
  const total = array.length;
  let resultado = "";
  for (var i = 0; i < total; resultado += array[i][0], i++);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      if (window.innerWidth < 1000) {
        // Filter out the "Tableros" module for responsive mode
        setUpdatedRoutes(routes.filter((route) => route.label !== "Tableros"));
      } else {
        // Reset routes to original when not in responsive mode
        setUpdatedRoutes(routes);
      }
    };

    window.addEventListener("resize", handleResize);
    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (width < 1000 && menuResponsive == false) {
    if (opened2 === true) {
    } else {
      setOpened2(true);
      sessionStorage.setItem("MenuState", opened2);
    }
  }
  if (width <= 767 && menuResponsive == false) {
    setMenuResponsive(true);
    setOpened2(false);
  } else {
    width > 767 && menuResponsive == true
      ? (setMenuResponsive(false), setOpened2(true))
      : "";
  }

  return (
    <>
      {menuResponsive == false ? (
        <AppShell
          navbarOffsetBreakpoint={"sm"}
          asideOffsetBreakpoint={"sm"}
          padding={"md"}
          navbar={
            <Navbar width={{ base: opened2 === false ? 240 : 67 }} p={"md"}>
              <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                  <div
                    style={{
                      display: "flex",
                      padding: opened2 === true ? ".5rem" : ".5px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                      flexDirection: "row",
                      overflowX: "hidden",
                    }}
                  >
                    <section
                      style={{
                        display: "flex",
                        flexDirection: opened2 === false ? "row" : "column",
                        gap: "0.8rem",
                        justifyContent: "space-between",
                        alignItems: "center",
                        whiteSpace: "pre",
                        marginLeft: "-7px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-menu-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        onClick={() => setOpened2((o) => !o)}
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 6l16 0" />
                        <path d="M4 12l16 0" />
                        <path d="M4 18l16 0" />
                      </svg>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "9px",
                          flex: 100,
                          // width: "180px",
                          height: "44px",
                        }}
                      >
                        <img
                          style={{
                            width: "1.3rem",
                            height: "1.3rem",
                            // marginLeft: -10,
                          }}
                          src={solkosSymbol}
                        />

                        <div
                          style={{
                            textAlign: "left",
                            display: opened2 === true ? "none" : "",
                          }}
                        >
                          <span
                            style={{
                              color: "#000005",
                              fontSize: "0.8rem",
                              fontStyle: "normal",
                              fontWeight: 700,
                              lineHeight: "155%",
                              // fontFamily: "DM Sans",
                            }}
                          >
                            Consola Solkos
                          </span>
                          <br></br>
                          <span
                            style={{
                              color: "#3A3A3F",
                              fontSize: "10px",
                              fontStyle: "normal",
                              fontWeight: 300,
                              lineHeight: "155%",
                              textTransform: "uppercase",
                              // fontFamily: "DM Mono",
                            }}
                          >
                            BY IMBERA
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "4px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "3px",
                          background: "#D4DAE3",
                          width: "25px",
                          height: "16px",
                          marginLeft: "10px",
                          display: opened2 === true ? "none" : "flex",
                        }}
                      >
                        <div
                          style={{
                            color: "#313A49",
                            // fontFamily: "Space Mono",
                            fontSize: "10px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "14px",
                            textTransform: "uppercase",
                          }}
                        >
                          {/* V2.3.0 */}
                          V2.7.1
                        </div>
                      </div>
                    </section>
                  </div>
                </Group>
                <div
                  style={{
                    padding: opened2 === true ? "0.1rem 0px" : "",
                    marginLeft: opened2 === true ? "-0.7rem" : "",
                  }}
                >
                  {links}
                </div>
              </Navbar.Section>

              <Navbar.Section className={classes.footer}>
                <Menu
                  shadow="md"
                  width={200}
                  position={"right-end"}
                  opened={opened}
                  onChange={setOpened}
                >
                  <Menu.Target>
                    <UnstyledButton className={classes.user}>
                      <div
                        style={{
                          display: "flex",
                          padding: "0px",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                          height: "16px",
                          marginLeft: -20,
                        }}
                      >
                        {/* CONTENT */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            flex: "100",
                          }}
                        >
                          {/* AVATAR */}
                          <div
                            style={{
                              display: "flex",
                              width: "38px",
                              height: "34px",
                              padding: "1px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "10px",
                              borderRadius: "32px",
                              background: "#E6E6E6",
                            }}
                          >
                            <div style={{ fontSize: 12 }}>
                              {resultado.toUpperCase() || "US"}
                            </div>
                          </div>

                          <div
                            style={{
                              // display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              width: "100%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              display: opened2 === true ? "none" : "flex",
                            }}
                          >
                            <Text
                              style={{
                                color: "#000005",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "155%",
                              }}
                            >
                              <div style={{ fontSize: 12 }}>
                                {Name || "User"}
                              </div>
                            </Text>
                            <div
                              style={{
                                display: "flex",
                                padding: "4px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "3px",
                                background: "#D4DAE3",
                                width: "100%",
                                boxSizing: "border-box",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#313A49",
                                  fontSize: "10px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "14px",
                                  textTransform: "uppercase",
                                }}
                              >
                                {dt || "IMBERA"}
                              </Text>
                            </div>
                          </div>
                        </div>
                        <img
                          src={"../../sampleData/arrows3.svg"}
                          style={{
                            marginLeft: 5,
                            display: opened2 === true ? "none" : "",
                          }}
                        />
                      </div>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {Role != "root" ? (
                      ""
                    ) : (
                      <>
                        <div
                          style={{
                            display: "flex",
                            padding: "8px",
                            alignItems: "flex-start",
                            gap: "10px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              color: "#88888B",
                              // fontFamily: "DM Sans",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "16px",
                            }}
                          >
                            Cambiar de organización
                          </div>
                        </div>
                        <div
                          style={{
                            maxHeight: "300px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                          }}
                        >
                          {/* Contenido del menú de cambio de organización */}
                          {data === undefined
                            ? "Sin registros"
                            : data.map((nombre, index) =>
                                JSON.parse(validaUser).length == 0 ? (
                                  <div
                                    style={{
                                      // display: "flex",
                                      padding: "10px 12px",
                                      alignItems: "center",
                                      gap: "10px",
                                      alignSelf: "stretch",
                                      display:
                                        JSON.parse(validaUser).length === 0
                                          ? ""
                                          : "none",
                                    }}
                                    key={index}
                                    onChange={setData}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        flex: "100",
                                        fontSize: "12px",
                                        textDecorationColor:
                                          dt === nombre ? "#ec547c" : "",
                                        color:
                                          dt === nombre ? "#ec547c" : "black",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        saveOrganization(nombre);
                                      }}
                                    >
                                      {nombre}
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      // display: "flex",
                                      padding: "10px 12px",
                                      alignItems: "center",
                                      gap: "10px",
                                      alignSelf: "stretch",
                                      display: dt === nombre ? "" : "none",
                                    }}
                                    key={index}
                                    onChange={setData}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        flex: "100",
                                        fontSize: "14px",
                                        textDecorationColor:
                                          dt === nombre ? "#ec547c" : "",
                                        color: dt === nombre ? "#ec547c" : "",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        saveOrganization(nombre);
                                      }}
                                    >
                                      {nombre}
                                    </div>
                                  </div>
                                )
                              )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "8px",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              width: "190px",
                              height: "1px",
                              background: "#CACACA",
                            }}
                          ></div>
                        </div>
                      </>
                    )}

                    <div
                      style={{
                        display: "flex",
                        padding: "8px",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          color: "#88888B",
                          // fontFamily: "DM Sans",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "16px",
                        }}
                      >
                        Sistema
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        padding: "10px 12px",
                        alignItems: "center",
                        gap: "10px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          flex: "100",
                        }}
                        onClick={() => {
                          localStorage.clear();
                          sessionStorage.clear();
                          navigate("/");
                        }}
                      >
                        <img
                          src={"../../sampleData/arrowmen.svg"}
                          style={{ width: "18px", height: "18px" }}
                        />
                        <Text
                          style={{
                            color: "#F93448",
                            // fontFamily: "DM Sans",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "16px",
                            cursor: "pointer",
                          }}
                        >
                          Cerrar sesión
                        </Text>
                      </div>
                    </div>
                  </Menu.Dropdown>
                </Menu>
              </Navbar.Section>
            </Navbar>
          }
          header={<Header height={0}></Header>}
        >
          <Outlet />
        </AppShell>
      ) : (
        <MenuResponsive
          links={links}
          data={data}
          setData={setData}
          validaUser={validaUser}
          saveOrganization={saveOrganization}
          resultado={resultado}
        />
      )}
    </>
  );
}

export default App;
