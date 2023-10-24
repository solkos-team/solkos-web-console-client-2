import { useState, useEffect } from "react";
import "./App.css";
import {
  Avatar,
  Code,
  Group,
  Navbar,
  Stack,
  Text,
  UnstyledButton,
  AppShell,
  createStyles,
  Menu,
  Footer,
  Header,
} from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { IconWifi, IconCircle } from "@tabler/icons-react";

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
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colorScheme === "dark"
            ? theme.white
            : theme.colors[theme.primaryColor][7],
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
    link: "/coolers",
    label: "Enfriadores",
    icon: <IconCircle size={24} />,
  },
  {
    link: "/alerts",
    label: "Alertas",
    icon: <IconCircle size={24} />,
  },
  {
    link: "/outlets",
    label: "Punto de venta",
    icon: <IconCircle size={24} />,
  },
  {
    link: "/panel",
    label: "Panel",
    icon: <IconCircle size={24} />,
  },
  {
    link: "/users",
    label: "Colaboradores",
    icon: <IconCircle size={24} />,
  },
];

function App() {
  const [coolersData, setCoolersData] = useState([]);
  const [count, setCount] = useState(0);
  const { classes, cx } = useStyles();
  const links = routes.map((item) => (
    // <Visible organization={item.organization} roles={item.roles}>

    <NavLink
      className={({ isActive }) =>
        cx(classes.link, { [classes.linkActive]: isActive })
      }
      to={item.link}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      {/* <item.icon className={classes.linkIcon} /> */}
      {item.icon}
      <span style={{ marginLeft: 10 }}>{item.label}</span>
    </NavLink>
    // </Visible>
  ));

  return (
    <>
      <AppShell
        navbarOffsetBreakpoint={"sm"}
        asideOffsetBreakpoint={"sm"}
        padding={"md"}
        navbar={
          <Navbar width={{ base: 300 }} p={"md"}>
            <Navbar.Section grow>
              <Group className={classes.header} position="apart">
                <Group>
                  <Avatar src={""} alt="" />
                  <Stack spacing={0}>
                    <Text size={"lg"}> Consola</Text>
                    <Text size={"xs"} color={"dimmed"} transform={"uppercase"}>
                      {"Solkos"}
                    </Text>
                  </Stack>
                </Group>
                <Code sx={{ fontWeight: 700 }}>v2.0.0</Code>
              </Group>
              {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
              <Menu shadow="md" width={200} position={"right-end"}>
                <Menu.Target>
                  <UnstyledButton className={classes.user}>
                    <Group>
                      <Avatar src={""} radius="xl" color={"brand"} />
                      <div style={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                          {/* {auth.user?.organization_name} */}
                        </Text>
                        {/* <Text color="dimmed" size="xs">
                          {auth.user?.name}
                        </Text> */}
                        <Text color="dimmed" size="xs">
                          {"Mayra Barrón"}
                        </Text>
                      </div>
                      {/* <IconChevronRight size={14} stroke={1.5} /> */}
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>
                    {/* {auth.user?.organization_name} */}
                  </Menu.Label>
                  <Menu.Item
                  // icon={<IconUser size={14} />}
                  // component={Link}
                  // to={`/users/${auth.user.user_id}`}
                  >
                    Perfil
                  </Menu.Item>
                  <Menu.Item
                    // icon={<IconLogout size={14} />}
                    onClick={() => {
                      auth.signout(() => navigate("/login"));
                      updateUnits("fahrenheit");
                    }}
                  >
                    Cerrar sesión
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Navbar.Section>
          </Navbar>
        }
        footer={
          <Footer height={64} p="md">
            <Group spacing={6}>
              <Text size={"sm"}>Consola</Text>
              <Text size={"xs"} color={"dimmed"}>
                ·
              </Text>
              <Text size={"xs"} transform={"uppercase"} color={"dimmed"}>
                by Solkos
              </Text>
              <Text size={"xs"} color={"dimmed"}>
                ·
              </Text>
              <Text size={"sm"}>{dayjs().year()}</Text>
            </Group>
          </Footer>
        }
        header={<Header height={0}></Header>}
      >
        <Outlet />
      </AppShell>
    </>
  );
}

export default App;
