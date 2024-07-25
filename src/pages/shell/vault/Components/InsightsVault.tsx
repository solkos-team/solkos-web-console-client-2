import React from "react";

export const InsightsVault = () => {
  return (
    <section className="vault_information_2">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            background: "#C7CBD2",
            height: "21px",
            width: "21px",
          }}
        >
          <img
            src={"../../sampleData/frid.svg"}
            alt="Descripción de la imagen"
            style={{ width: "18px", height: "18px" }}
          />
        </div>
        <span
          style={{
            color: "#000",
            fontSize: ".85rem",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "145%",
          }}
        >
          Estatus General
        </span>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          style={{ width: "40%", height: "22px", background: "#FFE3E3" }}
        ></div>
        <div
          style={{ width: "20%", height: "22px", background: "#FFE8CC" }}
        ></div>
        <div
          style={{ width: "25%", height: "22px", background: "#FFF3BF" }}
        ></div>
        <div
          style={{ width: "15%", height: "22px", background: "#D3F9D8" }}
        ></div>
      </div>

      <div
        style={{
          width: "100%",
          height: "1px",
          background: "#CED4DA",
          marginTop: 5,
        }}
      ></div>

      <div
        className="status"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          alignContent: "flex-start",
          rowGap: "16px",
          alignSelf: "stretch",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={"../../sampleData/red_b.svg"}
              alt="Descripción de la imagen"
              style={{ width: "10px", height: "10px" }}
            />
            <span
              style={{
                color: "#495057",
                fontSize: ".7rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "145%",
              }}
            >
              Bloqueados
            </span>
          </div>
          <span
            style={{
              color: "#000",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "145%",
            }}
          >
            75
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={"../../sampleData/orange_b.svg"}
              alt="Descripción de la imagen"
              style={{ width: "10px", height: "10px" }}
            />
            <span
              style={{
                color: "#495057",
                fontSize: ".7rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "145%",
              }}
            >
              Pendientes a bloquear
            </span>
          </div>
          <span
            style={{
              color: "#000",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "145%",
            }}
          >
            75
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={"../../sampleData/yellow_b.svg"}
              alt="Descripción de la imagen"
              style={{ width: "10px", height: "10px" }}
            />
            <span
              style={{
                color: "#495057",
                fontSize: ".7rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "145%",
              }}
            >
              Pendientes a desbloquear
            </span>
          </div>
          <span
            style={{
              color: "#000",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "145%",
            }}
          >
            75
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={"../../sampleData/green_b.svg"}
              alt="Descripción de la imagen"
              style={{ width: "10px", height: "10px" }}
            />
            <span
              style={{
                color: "#495057",
                fontSize: ".7rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "145%",
              }}
            >
              Desbloqueados
            </span>
          </div>
          <span
            style={{
              color: "#000",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "145%",
            }}
          >
            75
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={"../../sampleData/blue_b.svg"}
              alt="Descripción de la imagen"
              style={{ width: "10px", height: "10px" }}
            />
            <span
              style={{
                color: "#495057",
                fontSize: ".7rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "145%",
              }}
            >
              Total
            </span>
          </div>
          <span
            style={{
              color: "#000",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "145%",
            }}
          >
            75
          </span>
        </div>
      </div>
    </section>
  );
};
