import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core';
import React from 'react';

import { Outlet } from 'react-router-dom';
//@ts-ignore
import solkosSymbol from '../../sampleData/solkosSymbol.svg'
import PageFilter from '../pageFilter/PageFilter';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { DrawerOrganizationResponsive } from './DrawerOrganizationResponsive';

export const MenuResponsive = ({ links,data ,setData,validaUser,saveOrganization,resultado}) => {
  const [openedMenu, setOpened] = useState(false);
  const theme = useMantineTheme();
  const dt = useSelector((state: any) => state.organization);
  const Name = localStorage.getItem("USER") || "";  
  const [opened, { open, close }] = useDisclosure(false);
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
            hidden={!openedMenu}
            // when viewport size is less than theme.breakpoints.sm navbar width is 100%
            // viewport size > theme.breakpoints.sm – width is 300px
            // viewport size > theme.breakpoints.lg – width is 400px
            width={{ sm: 300, lg: 400 }}
          >
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '0.625rem', boxSizing: 'border-box' }}>
              <div style={{ width: '100%', height: '90%' }}>
                {links}
              </div>
              <div style={{ width: '100%', height: '10%', display: 'flex', flexDirection: 'row', padding: '0.5rem', boxSizing: 'border-box' ,gap:'1rem',borderTop:'1px solid  var(--gray-4, #CED4DA)'}} onClick={() => open()}>
                <div style={{ width: '20%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    style={{
                      color: "#313A49",
                      fontSize: "0.875rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "14px",
                      textTransform: "uppercase",
                    }}
                  >
                    {/* {dt || "IMBERA"} */}
                    {resultado.toUpperCase() || "US"}
                  </Text>
                </div>
                <div style={{ width: '60%', height: '100%', display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'flex-start'}}>                  
                  <Text
                    style={{
                      color: "#000005",
                      fontSize: "0.875rem",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "155%",
                    }}
                  >
                    <div style={{ fontSize: 12 }}>{Name || "User"}</div>
                  </Text>
                  <div style={{color:'var(--blue-6, #2393F4)',fontSize:'0.625rem',fontStyle:'normal',fontWeight:'700',lineHeight:'1rem',textTransform:'uppercase',padding:'1px 8px',boxSizing:'border-box',justifyContent:'center',alignItems:'center'}}>Imbera</div>
                </div>
                <div style={{ width: '20%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6 6.75L9 3.75L12 6.75M12 11.25L9 14.25L6 11.25" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>                
              </div>
              <DrawerOrganizationResponsive opened={opened}
            onClose={close} data={data} dt={dt} validaUser={validaUser} setData={setData} saveOrganization={saveOrganization}/>            
            </div>
          </Navbar>
        }
        header={
          <Header height={70} >
            {/* Handle other responsive styles with MediaQuery component or createStyles function */}
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={openedMenu}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <img
                  style={{
                    width: "1.3rem",
                    height: "1.3rem",
                    // marginLeft: -10,
                  }}
                  src={solkosSymbol}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="138" height="14" viewBox="0 0 138 14" fill="none">
                  <path d="M133.412 14C132.558 14 131.812 13.8661 131.175 13.5984C130.55 13.3179 130.053 12.9353 129.683 12.4508C129.326 11.9536 129.116 11.3862 129.052 10.7486H131.347C131.411 11.0164 131.525 11.265 131.691 11.4945C131.857 11.7113 132.08 11.8834 132.36 12.0109C132.654 12.1384 132.998 12.2022 133.393 12.2022C133.776 12.2022 134.088 12.1512 134.33 12.0492C134.573 11.9344 134.751 11.7878 134.866 11.6093C134.981 11.4308 135.038 11.2395 135.038 11.0355C135.038 10.7295 134.955 10.4936 134.789 10.3279C134.624 10.1621 134.381 10.0346 134.063 9.94536C133.757 9.84335 133.387 9.74773 132.953 9.65847C132.494 9.56922 132.048 9.46084 131.615 9.33334C131.194 9.19308 130.811 9.02095 130.467 8.81694C130.136 8.61293 129.868 8.35155 129.664 8.03279C129.473 7.71403 129.377 7.32514 129.377 6.86612C129.377 6.3051 129.524 5.80146 129.817 5.35519C130.123 4.90893 130.556 4.55829 131.117 4.30328C131.691 4.03552 132.373 3.90164 133.164 3.90164C134.286 3.90164 135.178 4.16303 135.841 4.6858C136.517 5.19581 136.912 5.91621 137.027 6.847H134.847C134.783 6.48998 134.605 6.21585 134.311 6.02459C134.018 5.82059 133.629 5.71858 133.145 5.71858C132.647 5.71858 132.265 5.81421 131.997 6.00547C131.742 6.18397 131.615 6.42623 131.615 6.73224C131.615 6.93625 131.691 7.11476 131.844 7.26776C132.01 7.42077 132.246 7.55465 132.552 7.6694C132.858 7.7714 133.234 7.87341 133.68 7.97541C134.394 8.11567 135.025 8.28142 135.574 8.47268C136.122 8.66394 136.555 8.94445 136.874 9.31421C137.193 9.68397 137.352 10.2067 137.352 10.8825C137.365 11.4945 137.206 12.0364 136.874 12.5082C136.555 12.98 136.103 13.3497 135.516 13.6175C134.93 13.8725 134.228 14 133.412 14Z" fill="black" />
                  <path d="M122.483 14C121.565 14 120.736 13.7896 119.996 13.3689C119.27 12.9353 118.696 12.3424 118.275 11.5902C117.867 10.8251 117.663 9.95173 117.663 8.96995C117.663 7.96266 117.873 7.08288 118.294 6.3306C118.715 5.56558 119.289 4.97268 120.016 4.55192C120.755 4.1184 121.584 3.90164 122.502 3.90164C123.42 3.90164 124.242 4.1184 124.969 4.55192C125.709 4.97268 126.282 5.5592 126.69 6.31148C127.111 7.06375 127.322 7.94354 127.322 8.95082C127.322 9.95811 127.111 10.8379 126.69 11.5902C126.27 12.3424 125.689 12.9353 124.95 13.3689C124.223 13.7896 123.401 14 122.483 14ZM122.483 12.0301C122.942 12.0301 123.356 11.9153 123.726 11.6858C124.108 11.4563 124.414 11.112 124.644 10.653C124.873 10.194 124.988 9.6266 124.988 8.95082C124.988 8.27505 124.873 7.71403 124.644 7.26776C124.427 6.80875 124.128 6.46448 123.745 6.23498C123.375 6.00547 122.961 5.89071 122.502 5.89071C122.056 5.89071 121.641 6.00547 121.259 6.23498C120.876 6.46448 120.57 6.80875 120.341 7.26776C120.111 7.71403 119.996 8.27505 119.996 8.95082C119.996 9.6266 120.111 10.194 120.341 10.653C120.57 11.112 120.87 11.4563 121.24 11.6858C121.622 11.9153 122.036 12.0301 122.483 12.0301Z" fill="black" />
                  <path d="M114.342 13.7705L110.077 8.4918L113.902 4.13115H116.637L111.875 9.42896V7.65027L117.211 13.7705H114.342ZM108.126 13.7705V0H110.422V13.7705H108.126Z" fill="black" />
                  <path d="M103.27 13.7705V0H105.565V13.7705H103.27Z" fill="black" />
                  <path d="M96.1849 14C95.2669 14 94.4381 13.7896 93.6986 13.3689C92.9718 12.9353 92.398 12.3424 91.9773 11.5902C91.5692 10.8251 91.3652 9.95173 91.3652 8.96995C91.3652 7.96266 91.5756 7.08288 91.9964 6.3306C92.4172 5.56558 92.9909 4.97268 93.7177 4.55192C94.4572 4.1184 95.286 3.90164 96.204 3.90164C97.1221 3.90164 97.9445 4.1184 98.6712 4.55192C99.4108 4.97268 99.9845 5.5592 100.393 6.31148C100.813 7.06375 101.024 7.94354 101.024 8.95082C101.024 9.95811 100.813 10.8379 100.393 11.5902C99.9718 12.3424 99.3916 12.9353 98.6521 13.3689C97.9253 13.7896 97.1029 14 96.1849 14ZM96.1849 12.0301C96.6439 12.0301 97.0583 11.9153 97.4281 11.6858C97.8106 11.4563 98.1166 11.112 98.3461 10.653C98.5756 10.194 98.6904 9.6266 98.6904 8.95082C98.6904 8.27505 98.5756 7.71403 98.3461 7.26776C98.1294 6.80875 97.8297 6.46448 97.4472 6.23498C97.0774 6.00547 96.663 5.89071 96.204 5.89071C95.7578 5.89071 95.3434 6.00547 94.9609 6.23498C94.5784 6.46448 94.2723 6.80875 94.0428 7.26776C93.8133 7.71403 93.6986 8.27505 93.6986 8.95082C93.6986 9.6266 93.8133 10.194 94.0428 10.653C94.2723 11.112 94.572 11.4563 94.9417 11.6858C95.3242 11.9153 95.7386 12.0301 96.1849 12.0301Z" fill="black" />
                  <path d="M84.8492 14C83.8802 14 83.0195 13.8279 82.2673 13.4836C81.515 13.1394 80.9285 12.6485 80.5077 12.0109C80.0869 11.3734 79.8702 10.6148 79.8574 9.73498H82.2864C82.2864 10.1812 82.3884 10.5829 82.5924 10.9399C82.8092 11.2842 83.1024 11.5583 83.4722 11.7623C83.8547 11.9663 84.3137 12.0683 84.8492 12.0683C85.3082 12.0683 85.7035 11.9982 86.035 11.8579C86.3793 11.7049 86.6407 11.4945 86.8192 11.2268C87.0104 10.9463 87.1061 10.6211 87.1061 10.2514C87.1061 9.83061 87.0041 9.48635 86.8 9.21859C86.6088 8.93808 86.341 8.70219 85.9968 8.51094C85.6525 8.31968 85.2572 8.15392 84.811 8.01367C84.3647 7.86066 83.8929 7.70128 83.3957 7.53553C82.3374 7.17851 81.5405 6.72587 81.005 6.1776C80.4694 5.61658 80.2017 4.87068 80.2017 3.9399C80.2017 3.16212 80.3866 2.49272 80.7563 1.9317C81.1261 1.37068 81.6425 0.937167 82.3055 0.631157C82.9813 0.312396 83.7591 0.153015 84.6388 0.153015C85.5314 0.153015 86.3092 0.312396 86.9722 0.631157C87.6479 0.949918 88.1771 1.39618 88.5596 1.96995C88.9549 2.53097 89.1589 3.20675 89.1716 3.99728H86.7235C86.7108 3.66576 86.6215 3.35975 86.4558 3.07924C86.29 2.78598 86.0478 2.5501 85.729 2.37159C85.423 2.18034 85.0469 2.08471 84.6006 2.08471C84.2181 2.07196 83.8738 2.13571 83.5678 2.27597C83.2745 2.40347 83.0387 2.59473 82.8602 2.84974C82.6944 3.09199 82.6115 3.39801 82.6115 3.76777C82.6115 4.12478 82.688 4.42442 82.841 4.66668C83.0068 4.89618 83.2427 5.09381 83.5487 5.25957C83.8547 5.41258 84.2117 5.55921 84.6197 5.69946C85.0277 5.83972 85.474 5.99272 85.9585 6.15848C86.6215 6.37524 87.2208 6.643 87.7563 6.96176C88.3046 7.26777 88.7381 7.66941 89.0569 8.16667C89.3756 8.66394 89.535 9.30784 89.535 10.0984C89.535 10.7869 89.3565 11.4308 88.9995 12.0301C88.6425 12.6166 88.1197 13.0947 87.4312 13.4645C86.7427 13.8215 85.882 14 84.8492 14Z" fill="black" />
                  <path d="M67.8394 14C67.0489 14 66.3923 13.8661 65.8695 13.5984C65.3467 13.3306 64.9578 12.9736 64.7028 12.5273C64.4478 12.0811 64.3203 11.5965 64.3203 11.0738C64.3203 10.4618 64.4733 9.93261 64.7793 9.48634C65.0981 9.04007 65.5635 8.69581 66.1755 8.45355C66.7875 8.19854 67.5398 8.07104 68.4323 8.07104H70.8613C70.8613 7.56102 70.7912 7.14026 70.6509 6.80875C70.5107 6.46448 70.2939 6.20947 70.0006 6.04372C69.7074 5.87796 69.3312 5.79508 68.8722 5.79508C68.3495 5.79508 67.9032 5.91621 67.5334 6.15847C67.1637 6.38798 66.9342 6.74499 66.8449 7.22951H64.5881C64.6646 6.54099 64.8941 5.95446 65.2766 5.46995C65.6591 4.97268 66.1628 4.59017 66.7875 4.32241C67.425 4.0419 68.1199 3.90164 68.8722 3.90164C69.7775 3.90164 70.5489 4.06102 71.1864 4.37978C71.824 4.68579 72.3085 5.13206 72.64 5.71858C72.9842 6.29235 73.1564 6.98725 73.1564 7.80328V13.7705H71.2056L70.9761 12.2213C70.8486 12.4763 70.6828 12.7122 70.4788 12.929C70.2875 13.1457 70.0644 13.337 69.8094 13.5027C69.5544 13.6557 69.2611 13.7769 68.9296 13.8661C68.6108 13.9554 68.2475 14 67.8394 14ZM68.3558 12.1831C68.7256 12.1831 69.0507 12.1193 69.3312 11.9918C69.6245 11.8515 69.8731 11.6603 70.0771 11.418C70.2939 11.163 70.4597 10.8825 70.5744 10.5765C70.6892 10.2705 70.7657 9.94536 70.8039 9.60109V9.56284H68.681C68.2347 9.56284 67.8649 9.62022 67.5717 9.73497C67.2784 9.84973 67.068 10.0091 66.9405 10.2131C66.813 10.4044 66.7493 10.6339 66.7493 10.9016C66.7493 11.1694 66.813 11.3989 66.9405 11.5902C67.068 11.7814 67.2529 11.9281 67.4952 12.0301C67.7374 12.1321 68.0243 12.1831 68.3558 12.1831Z" fill="black" />
                  <path d="M59.7705 13.7705V0H62.0656V13.7705H59.7705Z" fill="black" />
                  <path d="M52.6849 14C51.7669 14 50.9381 13.7896 50.1986 13.3689C49.4718 12.9353 48.898 12.3424 48.4773 11.5902C48.0692 10.8251 47.8652 9.95173 47.8652 8.96995C47.8652 7.96266 48.0756 7.08288 48.4964 6.3306C48.9171 5.56558 49.4909 4.97268 50.2177 4.55192C50.9572 4.1184 51.786 3.90164 52.704 3.90164C53.6221 3.90164 54.4445 4.1184 55.1712 4.55192C55.9108 4.97268 56.4845 5.5592 56.8926 6.31148C57.3133 7.06375 57.5237 7.94354 57.5237 8.95082C57.5237 9.95811 57.3133 10.8379 56.8926 11.5902C56.4718 12.3424 55.8916 12.9353 55.1521 13.3689C54.4253 13.7896 53.6029 14 52.6849 14ZM52.6849 12.0301C53.1439 12.0301 53.5583 11.9153 53.9281 11.6858C54.3106 11.4563 54.6166 11.112 54.8461 10.653C55.0756 10.194 55.1904 9.6266 55.1904 8.95082C55.1904 8.27505 55.0756 7.71403 54.8461 7.26776C54.6293 6.80875 54.3297 6.46448 53.9472 6.23498C53.5774 6.00547 53.163 5.89071 52.704 5.89071C52.2578 5.89071 51.8434 6.00547 51.4609 6.23498C51.0783 6.46448 50.7723 6.80875 50.5428 7.26776C50.3133 7.71403 50.1986 8.27505 50.1986 8.95082C50.1986 9.6266 50.3133 10.194 50.5428 10.653C50.7723 11.112 51.072 11.4563 51.4417 11.6858C51.8243 11.9153 52.2386 12.0301 52.6849 12.0301Z" fill="black" />
                  <path d="M42.0237 14C41.1695 14 40.4236 13.8661 39.786 13.5984C39.1613 13.3179 38.664 12.9353 38.2942 12.4508C37.9372 11.9536 37.7268 11.3862 37.6631 10.7486H39.9582C40.0219 11.0164 40.1367 11.265 40.3024 11.4945C40.4682 11.7113 40.6913 11.8834 40.9718 12.0109C41.2651 12.1384 41.6094 12.2022 42.0046 12.2022C42.3871 12.2022 42.6995 12.1512 42.9418 12.0492C43.184 11.9344 43.3625 11.7878 43.4773 11.6093C43.592 11.4308 43.6494 11.2395 43.6494 11.0355C43.6494 10.7295 43.5665 10.4936 43.4008 10.3279C43.235 10.1621 42.9928 10.0346 42.674 9.94536C42.368 9.84335 41.9982 9.74773 41.5647 9.65847C41.1057 9.56922 40.6594 9.46084 40.2259 9.33334C39.8052 9.19308 39.4226 9.02095 39.0784 8.81694C38.7469 8.61293 38.4791 8.35155 38.2751 8.03279C38.0839 7.71403 37.9882 7.32514 37.9882 6.86612C37.9882 6.3051 38.1349 5.80146 38.4281 5.35519C38.7341 4.90893 39.1676 4.55829 39.7287 4.30328C40.3024 4.03552 40.9846 3.90164 41.7751 3.90164C42.8971 3.90164 43.7897 4.16303 44.4527 4.6858C45.1285 5.19581 45.5237 5.91621 45.6385 6.847H43.4582C43.3944 6.48998 43.2159 6.21585 42.9226 6.02459C42.6294 5.82059 42.2405 5.71858 41.756 5.71858C41.2587 5.71858 40.8762 5.81421 40.6084 6.00547C40.3534 6.18397 40.2259 6.42623 40.2259 6.73224C40.2259 6.93625 40.3024 7.11476 40.4554 7.26776C40.6212 7.42077 40.8571 7.55465 41.1631 7.6694C41.4691 7.7714 41.8452 7.87341 42.2915 7.97541C43.0055 8.11567 43.6367 8.28142 44.1849 8.47268C44.7332 8.66394 45.1667 8.94445 45.4855 9.31421C45.8042 9.68397 45.9636 10.2067 45.9636 10.8825C45.9764 11.4945 45.817 12.0364 45.4855 12.5082C45.1667 12.98 44.7141 13.3497 44.1276 13.6175C43.541 13.8725 42.8398 14 42.0237 14Z" fill="black" />
                  <path d="M26.6367 13.7705V4.13115H28.664L28.8362 5.73771C29.1294 5.17669 29.5502 4.73042 30.0985 4.39891C30.6467 4.0674 31.297 3.90164 32.0493 3.90164C32.8271 3.90164 33.4901 4.0674 34.0384 4.39891C34.5866 4.71767 35.0074 5.18944 35.3007 5.81421C35.6067 6.43898 35.7597 7.21676 35.7597 8.14754V13.7705H33.4646V8.35792C33.4646 7.55465 33.2861 6.93625 32.9291 6.50273C32.5721 6.06922 32.0429 5.85246 31.3416 5.85246C30.8826 5.85246 30.4682 5.96084 30.0985 6.1776C29.7415 6.39436 29.4546 6.71312 29.2378 7.13388C29.0338 7.5419 28.9318 8.03916 28.9318 8.62568V13.7705H26.6367Z" fill="black" />
                  <path d="M19.5511 14C18.6331 14 17.8043 13.7896 17.0648 13.3689C16.338 12.9353 15.7642 12.3424 15.3435 11.5902C14.9355 10.8251 14.7314 9.95173 14.7314 8.96995C14.7314 7.96266 14.9418 7.08288 15.3626 6.3306C15.7834 5.56558 16.3571 4.97268 17.0839 4.55192C17.8234 4.1184 18.6522 3.90164 19.5702 3.90164C20.4883 3.90164 21.3107 4.1184 22.0375 4.55192C22.777 4.97268 23.3508 5.5592 23.7588 6.31148C24.1795 7.06375 24.3899 7.94354 24.3899 8.95082C24.3899 9.95811 24.1795 10.8379 23.7588 11.5902C23.338 12.3424 22.7579 12.9353 22.0183 13.3689C21.2916 13.7896 20.4691 14 19.5511 14ZM19.5511 12.0301C20.0101 12.0301 20.4245 11.9153 20.7943 11.6858C21.1768 11.4563 21.4828 11.112 21.7123 10.653C21.9418 10.194 22.0566 9.6266 22.0566 8.95082C22.0566 8.27505 21.9418 7.71403 21.7123 7.26776C21.4956 6.80875 21.1959 6.46448 20.8134 6.23498C20.4436 6.00547 20.0293 5.89071 19.5702 5.89071C19.124 5.89071 18.7096 6.00547 18.3271 6.23498C17.9446 6.46448 17.6385 6.80875 17.409 7.26776C17.1795 7.71403 17.0648 8.27505 17.0648 8.95082C17.0648 9.6266 17.1795 10.194 17.409 10.653C17.6385 11.112 17.9382 11.4563 18.3079 11.6858C18.6905 11.9153 19.1049 12.0301 19.5511 12.0301Z" fill="black" />
                  <path d="M7.0732 14C5.74715 14 4.59961 13.7131 3.63058 13.1394C2.67429 12.5528 1.93477 11.7432 1.412 10.7104C0.901982 9.66485 0.646973 8.45993 0.646973 7.09564C0.646973 5.71859 0.901982 4.51367 1.412 3.48088C1.93477 2.43535 2.67429 1.61932 3.63058 1.0328C4.59961 0.446276 5.74715 0.153015 7.0732 0.153015C8.66701 0.153015 9.96755 0.548279 10.9748 1.33881C11.9821 2.11658 12.6196 3.2195 12.8874 4.64755H10.3628C10.1843 3.89527 9.82092 3.30238 9.27265 2.86886C8.72439 2.43535 7.98486 2.21859 7.05408 2.21859C6.21255 2.21859 5.48577 2.41622 4.87375 2.81148C4.27448 3.194 3.80908 3.75502 3.47757 4.49454C3.15881 5.22132 2.99943 6.08835 2.99943 7.09564C2.99943 8.10292 3.15881 8.96995 3.47757 9.69673C3.80908 10.4108 4.27448 10.9654 4.87375 11.3607C5.48577 11.7432 6.21255 11.9344 7.05408 11.9344C7.98486 11.9344 8.72439 11.7368 9.27265 11.3415C9.82092 10.9335 10.1843 10.3725 10.3628 9.65848H12.8874C12.6324 11.01 11.9949 12.0747 10.9748 12.8525C9.96755 13.6175 8.66701 14 7.0732 14Z" fill="black" />
                </svg>
              </div>
              <div style={{ width: '10%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                  <PageFilter menuResponsive={true} />
                </Text>
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
