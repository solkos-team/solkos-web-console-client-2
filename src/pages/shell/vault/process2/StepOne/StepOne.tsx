import React from "react";
import { TagInput } from "rsuite";
import { ButtonNext } from "../../Components/ButtonNext";
import { ButtonBack } from "../../Components/ButtonBack";
import { RoadMap } from "../../Components/RoadMap";

export const StepOne = () => {
  return (
    <React.Fragment>
      {/* Seccion RoadMap */}
      <div
        style={{
          width: "100%",
          height: "10%",
        //   visibility: "hidden",          
        }}
      >
        <RoadMap />
      </div>
      <div
        style={{
          width: "100%",
          height: "25%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={"../../sampleData/logovault.svg"}
          alt="Descripción de la imagen"
          style={{ width: "5rem", height: "3rem", marginTop: -20 }}
        />
        <div
          style={{
            position: "relative",
            width: "60%",
          }}
        >
          <TagInput
            //   value={tags}
            trigger={["Enter", "Space", "Comma"]}
            //   onChange={handleTagChange}
            // onKeyDown={handleKeyDown}
            placeholder="Buscar por Serie o Mac"
            style={{
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "1.8rem",
              width: "100%",
              paddingRight: "10rem",
              borderRadius: "4px",
              color: "#88888B",
              border: "1px solid #ccc",
              textAlign: "left",
            }}
          />
          <img
            src={"../../sampleData/searchC.svg"}
            alt="Descripción de la imagen"
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "15px",
              height: "15px",
              pointerEvents: "none",
              // opacity: tags.length ? "0" : "1",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "10px", // Espacio entre el botón y el texto con la imagen
          }}
        >
          <text
            style={{
              color: "#ED5079",
              fontSize: ".9rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "28px",
              cursor: "pointer",
              marginRight: "5px", // Espacio entre el texto y la imagen
            }}
          >
            Ir a vista con tabla{"   "}
          </text>
          <img
            src={"../../sampleData/table.svg"}
            alt="Descripción de la imagen"
            style={{ width: "18px", height: "15px", marginTop: 6 }}
          />
        </div>
      </div>
      {/* Seccion Tabla */}
      <div
        style={{
          width: "100%",
          height: "55%",
          visibility: "hidden",
        }}
      >
        <h1>Tabla</h1>
      </div>
      {/* Seccion botones */}
      <div
        style={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap: "0.5rem",
        }}
      >
        <ButtonBack />
        <ButtonNext />
      </div>
    </React.Fragment>
  );
};
