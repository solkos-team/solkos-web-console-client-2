import { useSelector } from "react-redux";

const pathVerify = () => {
    const dt = useSelector((state: any) => state.works);
    return dt.length == 0 ? [] : JSON.parse(dt);
  };

export {pathVerify}