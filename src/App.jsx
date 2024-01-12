import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { useLocation } from "react-router-dom";
import {
  Group,
  Navbar,
  Text,
  UnstyledButton,
  AppShell,
  createStyles,
  Menu,
  Header,
  Select,
  Button,
} from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import solkosSymbol from "./sampleData/solkosSymbol.png";
import coolers from "./sampleData/coolers.png";
import clt from "./sampleData/clt.png";
import pv from "./sampleData/pv.png";
import boards from "./sampleData/boards.png";
import collab from "./sampleData/collab.png";
import arrows from "./sampleData/arrows.png";
import arrow2 from "./sampleData/arrow2.png";
import arrow_1 from "./sampleData/arrow_1.png";
import arrow_2 from "./sampleData/arrow_2.png";
import alert from "./sampleData/alert.png";
import fails from "./sampleData/fails.png";
import ind from "./sampleData/ind.png";
import { addOrg } from "./app/organization";


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
      borderBottom: `1px solid ${theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2]
        }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2]
        }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
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
    icon: <img src={coolers} />,
    initiallyOpened: true,
    links: [
      {
        label: "Insights",
        link: "/insights",
        icon: <img src={"../../sampleData/system_3.png"} alt="cooler"></img>,
      },
      {
        label: "Alertas",
        link: "/alerts",
        icon: <img src={alert} />,
      },
      {
        label: "Fallas",
        link: "/fails",
        icon: <img src={fails} />,
      },
      {
        label: "Indicadores",
        link: "/indicator",
        icon: <img src={ind} />,
      },
    ],
  },
  {
    link: "/clt",
    label: "Cooler Life Tracking",
    icon: <img src={clt} />,
  },
  {
    link: "/outlets",
    label: "Puntos de venta",
    icon: <img src={pv} />,
  },
  {
    link: "/panel",
    label: "Tableros",
    icon: <img src={boards} />,
  },
  {
    link: "/users",
    label: "Colaboradores",
    icon: <img src={collab} />,
  },
];

function App() {
  const { classes, cx } = useStyles();
  const [coolerInsightsOpen, setCoolerInsightsOpen] = useState(true);
  const [data, setData] = useState(['KOF', 'HEINEKEN','PEÑAFIEL','MONDELEZ','AGA','ECO'])
  const [opened, setOpened] = useState(false); // state of menu
  const location = useLocation();
  const [value, setValue] = useState();
  const closeCoolerInsights = () => {
    setCoolerInsightsOpen(false);
  };

  useEffect(() => {
    // Cambia el estado de coolerInsightsOpen a true solo si la ubicación es el índice ("/")
    setCoolerInsightsOpen(location.pathname === "/");
    initOrg()
  }, [location.pathname]);

  const links = routes.map((item) => (
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
            <span style={{ marginLeft: 10 }}>{item.label}</span>
            {coolerInsightsOpen ? (
              <img src={arrow_1} style={{ marginLeft: 70 }} />
            ) : (
              <img src={arrow_2} style={{ marginLeft: 70 }} />
            )}
          </div>

          {coolerInsightsOpen && (
            <div style={{ marginLeft: 20 }}>
              {item.links.map((option) => (
                <NavLink
                  to={option.link}
                  className={classes.link}
                  key={option.label}
                  activate={true.toString()} // Convert boolean to string
                  onClick={closeCoolerInsights} // Cierra Cooler Insights al hacer clic en una subruta
                >
                  {option.icon && option.icon}{" "}
                  <span style={{ marginLeft: 10 }}>{option.label}</span>
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
          <span style={{ marginLeft: 10 }}>{item.label}</span>
        </NavLink>
      )}
    </div>
  ));
  const dispatch = useDispatch();
  const dt = useSelector((state) => state.organization)

  const saveOrganization = (ORG) => {
    if (ORG) {
      localStorage.setItem("ORG", ORG);
      dispatch(addOrg())
      setOpened(false)
    }
  }  
  const initOrg = () => {
    dt == []
    ? console.log(dt)
    : saveOrganization("KOF")
  }
    
  return (
    <>
      <AppShell
        navbarOffsetBreakpoint={"sm"}
        asideOffsetBreakpoint={"sm"}
        padding={"md"}
        navbar={
          <Navbar width={{ base: 270 }} p={"md"}>
            <Navbar.Section grow>
              <Group className={classes.header} position="apart">
                <div
                  style={{
                    display: "flex",
                    padding: "10px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      flex: 100,
                      // width: "180px",
                      height: "44px",
                    }}
                  >
                    <img
                      style={{ width: "24px", height: "24px" }}
                      src={solkosSymbol}
                    />

                    <div style={{ textAlign: "left" }}>
                      <span
                        style={{
                          color: "#000005",
                          fontSize: "16px",
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
                          fontSize: "12px",
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
                      display: "flex",
                      padding: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "3px",
                      background: "#D4DAE3",
                      width: "41px",
                      height: "16px",
                      marginLeft: "10px",
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "Space Mono",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "14px",
                        textTransform: "uppercase",
                      }}
                    >
                      V2.0.0
                    </div>
                  </div>
                </div>
              </Group>
              {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
              <Menu shadow="md" width={200} position={"right-end"} opened={opened} onChange={setOpened}>
                <Menu.Target>
                  <UnstyledButton className={classes.user}>
                    <div
                      style={{
                        display: "flex",
                        padding: "10px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        height: "16px",
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
                            height: "38px",
                            padding: "1px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            borderRadius: "32px",
                            background: "#E6E6E6",
                          }}
                        >
                          MB
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column", // Cambiado a dirección de columna
                            alignItems: "flex-start",
                          }}
                        >
                          <Text
                            style={{
                              // alignSelf: "stretch",
                              color: "#000005",
                              // fontFamily: "DM Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "155%",
                            }}
                          >
                            Mayra Barrón
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
                              width: 50,
                            }}
                          >
                            <Text
                              style={{
                                color: "#313A49",
                                // fontFamily: "Space Mono",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "14px",
                                textTransform: "uppercase",
                              }}
                            >
                              IMBERA
                            </Text>
                          </div>
                        </div>
                      </div>
                      <img src={arrows} />
                    </div>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
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
                  {
                    data.map((nombre, index) => (
                      <div
                        style={{
                          display: "flex",
                          padding: "10px 12px",
                          alignItems: "center",
                          gap: "10px",
                          alignSelf: "stretch",
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
                            textDecorationColor: dt === nombre ? "#ec547c" : "",
                            color: dt === nombre ? "#ec547c" : "",
                            cursor:"pointer"
                          }}
                          onClick={() => { saveOrganization(nombre) }}
                        >
                          {nombre}
                        </div>
                      </div>
                    ))
                  }
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
                        color: "#000005",
                        // fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "16px",
                      }}
                    >
                      Mi cuenta
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
                    >
                      <img
                        src={arrow2}
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
    </>
  );
}

export default App;
