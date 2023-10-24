import {
  Anchor,
  Breadcrumbs,
  createStyles,
  ScrollArea,
  Text,
  Group,
  Divider,
  Stack,
} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  social: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },
}));

interface Path {
  name: string;
  to: string;
}

interface PageProps {
  paths: Path[];
  current: string;
  view: string;
  children?: JSX.Element | JSX.Element[];
  controls?: JSX.Element[] | undefined;
}

export default function ({
  paths,
  current,
  view,
  children,
  controls,
}: PageProps) {
  const { classes } = useStyles();

  return (
    <ScrollArea>
      <div className={classes.header}>
        <div className={classes.inner}>
          <Breadcrumbs>
            {/* {paths.map((path) => (
              <Anchor href={path.to} key={path.to}>
                {path.name}
              </Anchor>
            ))} */}
            <Text color={"#ff4c8c"} style={{ fontSize: "20px" }}>
              <b>{current}</b>
            </Text>
          </Breadcrumbs>
          {controls != undefined && (
            <Group
              spacing={0}
              className={classes.social}
              position="right"
              noWrap
            >
              {controls}
            </Group>
          )}
        </div>

        <Divider my="sm" />

        <Stack spacing={0}>
          <Text size={"xs"} color={"dimmed"} transform={"uppercase"}>
            {view}
          </Text>
          {/* <Text size={"lg"}>{current}</Text> */}
        </Stack>
      </div>

      <ScrollArea>{children}</ScrollArea>
    </ScrollArea>
  );
}
