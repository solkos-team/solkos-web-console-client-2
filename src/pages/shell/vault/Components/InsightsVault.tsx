import React, { useEffect, useState } from "react";
import { fetchVaulInsights } from "../../../../utils/apiUtils";
import { useSelector } from "react-redux";

interface VaultData {
  bloqueados: number;
  a_bloquear: number;
  a_desbloquear: number;
  desbloqueados: number;
  total: number;
}

export const InsightsVault = () => {
  const dto = useSelector((state: any) => state.organization);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<VaultData | null>(null);

  const body = {
    customer: dto,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await fetchVaulInsights(
          "/vault_insights",
          setIsLoading,
          body
        );
        setData(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching vault insights:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dto]);

  if (data === null) {
    return <div>Loading...</div>; // Loading state
  }

  // Destructuring data
  const { bloqueados, a_bloquear, a_desbloquear, desbloqueados, total } = data;

  // Calculate the total value
  const totalValue = bloqueados + a_bloquear + a_desbloquear + desbloqueados;

  // Calculate widths as a percentage of the total value
  const blockedWidth = (bloqueados / totalValue) * 100;
  const toBlockWidth = (a_bloquear / totalValue) * 100;
  const toUnlockWidth = (a_desbloquear / totalValue) * 100;
  const unlockedWidth = (desbloqueados / totalValue) * 100;

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

      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            width: `${blockedWidth}%`,
            height: "22px",
            background: "#FFE3E3",
          }}
        ></div>
        <div
          style={{
            width: `${toBlockWidth}%`,
            height: "22px",
            background: "#FFE8CC",
          }}
        ></div>
        <div
          style={{
            width: `${toUnlockWidth}%`,
            height: "22px",
            background: "#FFF3BF",
          }}
        ></div>
        <div
          style={{
            width: `${unlockedWidth}%`,
            height: "22px",
            background: "#D3F9D8",
          }}
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
            {bloqueados}
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
            {a_bloquear}
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
            {a_desbloquear}
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
            {desbloqueados}
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
            {total}
          </span>
        </div>
      </div>
    </section>
  );
};
