import React, { useRef, useEffect } from "react";
import { Button } from "rsuite";
import { useNavigate } from "react-router-dom";

export default function Stepper6() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Aquí puedes manejar el archivo seleccionado
    }
  };

  useEffect(() => {
    // Añadir overflow hidden al montar el componente
    document.body.style.overflow = "hidden";

    // Eliminar overflow hidden al desmontar el componente
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="vault_Information_Container2">
      <div className="vault_information_1">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <img
            src={"../../sampleData/logovault.svg"}
            alt="Descripción de la imagen"
            style={{ width: "5rem", height: "3rem", marginTop: "-20px" }}
          />
          <span style={{ color: "#88888B", fontSize: ".8rem" }}>
            Proceder con los cambios.
          </span>
        </div>
      </div>

      <div className="vault_information_2">
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
      </div>
      <section
        style={{
          width: "100%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <section className="vault_container_final">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect width="24" height="24" rx="4" fill="#B2F2BB" />
            <path
              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#40C057"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="vault_container_final_h1">Proceso Completo</div>
        </section>
      </section>
      <div className="button-container">
        <Button
          className="continue-button"
          style={{
            fontSize: "0.8rem",
            color: "white",
            background: "#ED5079",
          }}
          onClick={() => {
            navigate(`/home/Process1Vault`);
          }}
        >
          Terminar
        </Button>
      </div>
    </div>
  );
}
