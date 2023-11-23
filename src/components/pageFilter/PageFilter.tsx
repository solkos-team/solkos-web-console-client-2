import React, { useState, useEffect } from "react";
import {
  IconSearch,
  IconArrowNarrowLeft,
  IconLock,
  IconChevronRight,
  IconCircleX,
  IconCirclePlus,
} from "@tabler/icons-react";
import { Text } from "@mantine/core";

export default function ({}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          // padding: "0px 32px",
          marginLeft: -60,
          alignItems: "center",
          gap: "32px",
          alignSelf: "stretch",
          marginTop: -30,
          maxWidth: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            strokeWidth: "0.5",
            border: "0.5px solid #ADBACC",
            borderRadius: "4px",
            // boxSizing: "border-box",
          }}
        >
          <IconArrowNarrowLeft />
        </div>
        <div
          style={{
            display: "flex",
            padding: "4px",
            alignItems: "flex-start",
            gap: "8px",
            // flex: "100",
            border: "0.5px solid #ADBACC",
            width: "fit-content",
            borderRadius: "4px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #ADBACC",
                background: "#D4DAE3",
                padding: "3px 7px",
              }}
            >
              <IconLock
                style={{
                  color: "#ADBACC",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
              <Text
                style={{
                  color: "#ADBACC",
                  // fontFamily: "Space Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  textTransform: "uppercase",
                }}
              >
                CLIENTE
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {/* ZONA */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #313A49",
                padding: "3px 7px",
              }}
            >
              <IconCircleX
                style={{
                  color: "#313A49",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
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
                ZONA
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {/* REGION */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #313A49",
                padding: "3px 7px",
              }}
            >
              <IconCircleX
                style={{
                  color: "#313A49",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
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
                REGIÓN
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {/* UO */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #313A49",
                padding: "3px 7px",
              }}
            >
              <IconCircleX
                style={{
                  color: "#313A49",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
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
                UNIDAD OPERATIVA
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {/* RUTA */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #313A49",
                padding: "3px 7px",
              }}
            >
              <IconCircleX
                style={{
                  color: "#313A49",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
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
                RUTA
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {/* ---------------------- */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "3px 7px",
              }}
            >
              <IconCirclePlus
                style={{
                  color: "#313A49",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
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
                AÑADIR FILTRO
              </Text>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "200px",
            height: "31px",
            strokeWidth: "0.5",
            border: "0.5px solid #ADBACC",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "1px 10px",
              alignItems: "center",
              gap: "10px",
              flex: "100",
            }}
          >
            <IconSearch
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginRight: "3px",
              }}
            />
            <Text
              style={{
                display: "flex",
                color: "#ADBACC",
                // fontFamily: "Space Mono",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "14px",
                textTransform: "uppercase",
              }}
            >
              Buscar
            </Text>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "2px",
                background: "#D4DAE3",
                padding: "4px",
                marginLeft: "auto",
              }}
            >
              <div
                style={{
                  color: "#313A49",
                  // fontFamily: "DM Mono",
                  fontSize: "10px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "14px",
                }}
              >
                Ctrl + K
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        style={{
          marginTop: "14px",
          display: "flex",
          padding: "4px 0px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{ width: "1619px", height: "1px", background: "#CACACA" }}
        ></div>
      </div> */}
    </div>
  );
}
