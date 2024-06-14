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
    case "Mayra":
      return "flex";
    case "Alondra Trejo Cruz":
      return "flex";
    case "Veronica Ramirez Moran":
      return "flex";
    default:
      return "none";
  }
};
export { pathVerify, userVerify, validateAndExecute };
