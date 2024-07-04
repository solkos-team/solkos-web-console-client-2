import { Drawer } from '@mantine/core'
import React from 'react'

export const DrawerVault = ({opened,onCLose}) => {
  return (
    <Drawer
      opened={opened}
      onClose={onCLose}
      title=""
      position="right"
      size="40rem"
    >
      <section className="vault_drawer_container">
        <section className="vault_drawer_header"></section>
        <section className="vault_drawer_registro"></section>
        <section className="vault_drawer_mapa">
          <div className="vault_drawer_mapa_title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="27"
              viewBox="0 0 26 27"
              fill="none"
            >
              <path
                d="M13.0007 15.6666C14.7956 15.6666 16.2507 14.2115 16.2507 12.4166C16.2507 10.6217 14.7956 9.1666 13.0007 9.1666C11.2057 9.1666 9.75065 10.6217 9.75065 12.4166C9.75065 14.2115 11.2057 15.6666 13.0007 15.6666Z"
                stroke="#313A49"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.1291 18.545L14.5325 23.1416C14.1262 23.5474 13.5755 23.7754 13.0012 23.7754C12.4269 23.7754 11.8762 23.5474 11.4699 23.1416L6.87224 18.545C5.66023 17.3329 4.83485 15.7887 4.50048 14.1075C4.16611 12.4264 4.33777 10.6838 4.99374 9.10022C5.64971 7.51662 6.76054 6.1631 8.18576 5.21081C9.61098 4.25852 11.2866 3.75024 13.0007 3.75024C14.7147 3.75024 16.3903 4.25852 17.8156 5.21081C19.2408 6.1631 20.3516 7.51662 21.0076 9.10022C21.6635 10.6838 21.8352 12.4264 21.5008 14.1075C21.1665 15.7887 20.3411 17.3329 19.1291 18.545Z"
                stroke="#313A49"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Ubicación en el mapa</p>
          </div>
          <div className="vault_drawer_mapa_mapa"></div>
        </section>
      </section>
    </Drawer>
  );
}
