import { useSelector } from "react-redux";

function validateAndExecute() {
  if (!location.pathname.includes("/home/clt")) {
    localStorage.removeItem("searchTags");
  }
}
const pathVerify = () => {
  const dt = useSelector((state: any) => state.works);
  return dt.length == 0 ? [] : JSON.parse(dt);
};
const userVerify = (user) => {
  switch (user) {
    case "Jose Ivan Perez Ugalde":
      return "flex";
    case "Ruben Valenzuela Medel":
      return "flex";
    case "Flavio Rocha Serrano":
      return "flex";
    case "Ricardo Ruiz Vazquez":
      return "flex";
    case "Jesus Angel Soria Lopez":
      return "flex";
    case "Mayra Barrón Reséndiz":
      return "flex";
    case "Alondra Trejo Cruz":
      return "flex";
    case "Veronica Ramirez Moran":
      return "flex";
    case "Maria Luisa Rojo Siliceo Hernández":
      return "flex";
    case "Jose Carlos Bautista Olvera":
      return "flex";
    case "Mayra Barrón CallCenter":
      return "flex";
    case "Natalia Ramirez Corona":
      return "flex";
    case "Luis Pablo Monroy Martinez":
      return "flex";
    case "Jose Uriel Trejo Piña":
      return "flex";
    case "Jose Salinas":
      return "flex";
    case "Bertha Lilia Nieto Ramirez":
      return "flex";
    case "Gabriel Sanchez Najera":
      return "flex";
    case "Miguel Salvador García Enciso":
      return "flex";
    case "Cejudo Avalos Luis Antonio":
      return "flex";
    case "Aldo Moreno Martinez":
      return "flex";
    default:
      return "none";
  }
};
const tagStyles = (value, tagElements) => {
  if (value) {
    const indexData =
      value
        .filter((item) => item.status === "No encontrado")
        .map((item) => item.serial_number) ?? null;
    const tags = tagElements ?? null;
    if (indexData != null && tags != null) {
      tags.forEach((tag) => {
        if (indexData.includes(tag.getAttribute("title"))) {
          (tag as HTMLElement).style.backgroundColor = "#F93448";
          (tag as HTMLElement).style.color = "#fff";
        }
      });
    }
  }
};
const tagStylesVault = (value, tagElements) => {
  if (value) {
    const indexData =
      value
        .filter((item) => item.device_id === "NO ENCONTRADO")
        .map((item) => item.serial_number) ?? null;
    const tags = tagElements ?? null;
    if (indexData != null && tags != null) {
      tags.forEach((tag) => {
        if (indexData.includes(tag.getAttribute("title"))) {
          (tag as HTMLElement).style.backgroundColor = "#F93448";
          (tag as HTMLElement).style.color = "#fff";
        }
      });
    }
  }
};
export { pathVerify, userVerify, validateAndExecute, tagStyles ,tagStylesVault};
