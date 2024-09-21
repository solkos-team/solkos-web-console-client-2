import React, { useRef, useEffect, useState } from "react";
import { Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import { InsightsVault } from "../Components/InsightsVault";
import UploadExcel from "../../../../components/excelFile/ExcelFile";
import { VaultLogo } from "../../../../sampleData/Vault/VaultIcons";
import { fetchVaulValidate } from "../../../../utils/apiUtils";
import { useSelector } from "react-redux";

interface OriginalExcelData {
  mac: string | boolean;
  estatus: string | boolean;
}

interface TransformedExcelData {
  device_id: string | boolean;
  estatus: string | boolean;
}

export default function Process1Vault() {
  const [isAlertVisible, setAlertVisible] = useState(true);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [excelData, setExcelData] = useState<TransformedExcelData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const dto = useSelector((state: any) => state.organization);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      console.log("Selected file:", file.name);

      // Limpiar los datos anteriores
      setExcelData([]); // Resetea los datos previos
      setData(null); // Limpiar el resultado anterior si es necesario
      setIsFileUploaded(false); // Restablecer el estado de carga de archivo
    }
  };

  const handleFileLoaded = (data: OriginalExcelData[]) => {
    // console.log("Datos originales del archivo cargado:", data);

    // Limpiar excelData antes de cargar nuevos datos
    setExcelData([]);

    // Realizar la transformación
    const transformedData = data.map((item) => ({
      device_id: item.mac || "", //
      estatus: item.estatus === true || item.estatus === "true",
    }));

    // Agregar los datos transformados
    setExcelData(transformedData);
    // console.log("Datos del archivo cargado (transformados):", transformedData);

    // Cambiar el estado a true cuando se sube un archivo
    setIsFileUploaded(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  useEffect(() => {
    const fetchData = async () => {
      if (excelData.length > 0) {
        const body = {
          coolers: excelData.map((item) => ({
            device_id: String(item.device_id || ""),
            estatus:
              item.estatus === "true" || item.estatus === true ? true : false,
          })),
        };

        console.log(
          "Estructura del body con múltiples coolers:",
          JSON.stringify(body, null, 2)
        );

        try {
          setIsLoading(true);

          const result = await fetchVaulValidate(
            "vault_validate",
            setIsLoading,
            body
          );
          setData(result);
        } catch (error) {
          console.error("Error fetching vault insights:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [dto, excelData]);

  return (
    <section style={{ marginTop: -40, marginLeft: -20 }}>
      <div className="vault_Information_Container2" style={{ height: 550 }}>
        <div className="vault_information_1" style={{ marginLeft: -10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <img
              src={VaultLogo}
              alt="Descripción de la imagen"
              style={{
                width: "3.688rem",
                height: "1.125rem",
              }}
            />
            <span style={{ color: "#88888B", fontSize: ".8rem" }}>
              Haz seguimiento de todos los parámetros de cada uno de tus
              enfriadores.
            </span>
          </div>
        </div>

        <InsightsVault />

        {isAlertVisible && (
          <div
            className="vault_information_3"
            style={{
              position: "relative",
              padding: "10px",
              backgroundColor: "#F1F1F1",
              border: "1px solid #CED4DA",
              borderRadius: "4px",
            }}
          >
            <img
              src={"../../sampleData/exclamation.svg"}
              alt="Descripción de la imagen"
              style={{
                width: "1rem",
                height: "1rem",
                verticalAlign: "middle",
                marginRight: "8px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "5px",
                flex: 100,
              }}
            >
              <span
                style={{
                  color: "#868E96",
                  fontSize: "0.8rem",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "145%",
                }}
              >
                Cargar archivos
              </span>
              <span
                style={{
                  color: "#000",
                  fontSize: "0.8rem",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "21px",
                }}
              >
                Selecciona o arrastra el archivo xls.
              </span>
            </div>
            <button
              onClick={handleCloseAlert}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img
                src={"../../sampleData/x_2.svg"}
                alt="Cerrar"
                style={{ width: "1rem", height: "1rem" }}
              />
            </button>
          </div>
        )}
        <div className="vault_information_4">
          <UploadExcel onFileLoaded={handleFileLoaded} />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="button-container">
          <Button
            className="continue-button"
            style={{
              fontSize: "0.8rem",
              color: "white",
              background: "#ED5079",
            }}
            onClick={() => {
              navigate(`/home/Stepper1`, { state: { vaultData: data } });
            }}
            disabled={isLoading || !isFileUploaded}
          >
            Continuar
          </Button>
        </div>
      </div>
    </section>
  );
}
