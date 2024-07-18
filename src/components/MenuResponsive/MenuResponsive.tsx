import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const MenuResponsive = () => {
    const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <section 
    // style={{display:'none'}}
    >
        <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 300, lg: 400 }}
        >
          <div style={{width:'100%',height:'100%',background:'blue',display:'flex',flexDirection:'column'}}>
            <div style={{width:'100%',height:'90%',backgroundColor:'gold'}}>ruteo</div>
            <div style={{width:'100%',height:'10%',backgroundColor:'gray'}}>organizacion</div>
          </div>
        </Navbar>
      }
      header={
        <Header height={70} >
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <div style={{width:'90%' , backgroundColor:'red'}}>
            <Text>Logo Consola Soolkos</Text>
            </div>
            <div style={{width:'10%' , backgroundColor:'aqua'}}>
            <Text>🔎</Text>
            </div>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
    </section>    
  );
}
