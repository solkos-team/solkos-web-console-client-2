// PRODUCTIVO
// const baseUrl = "https://universal-console-server-b7agk5thba-uc.a.run.app";

import { FetchOptions } from "../interfaces/ApiInterfaces";

// QA
const baseUrl =
  "https://qa-test---universal-console-server-b7agk5thba-uc.a.run.app/";

export const fetchCoolers = async (path, setIsLoading?, id?) => {
  if (setIsLoading) {
    setIsLoading(!false);
  }
  const url = `${baseUrl}/coolers`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: "KOF",
    class: "STK",
    algorithm: ["INSTALLED", "OWNED"],
    path: path,
    page_size: 1000,
    page_number: 1,
    outlet_id: id,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error fetching coolers");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const fetchCoolersDrawer = async (
  path?,
  setIsLoading?,
  id?,
  selectedAlgorithm?
) => {
  if (setIsLoading) {
    setIsLoading(!false);
  }
  const url = `${baseUrl}/coolers`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: "KOF",
    class: "OPE",
    algorithm: [selectedAlgorithm],
    path: path,
    page_size: 1000,
    page_number: 1,
    outlet_id: id,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error fetching coolers");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const fetchCoolerDetails = async (serialNumber) => {
  const url = `${baseUrl}/coolers/${serialNumber}`;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Error fetching cooler details");
    }

    const responseData = await response.json();

    return {
      serial_number: serialNumber,
      ...responseData,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchOutlets = async (path, setIsLoading?) => {
  if (setIsLoading) {
    setIsLoading(!false);
  }
  const url = `${baseUrl}/outlets`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: "KOF",
    page_size: 1000,
    page_number: 1,
    path: path,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error fetching outlets");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const fetchAlerts = async (path, dto) => {
  const url = `${baseUrl}/alerts`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: dto,
    path,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error fetching alerts data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const fetchInsights = async (path) => {
  const url = `${baseUrl}/insights`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: "KOF",
    path: path,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error fetching insights");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const fetchUniversal = async (
  componentURL,
  data?,
  setIsLoading?,
  detailsID?,
  CRUD?
) => {
  const url = `${baseUrl}/${componentURL}`;
  detailsID ? url + "/" + detailsID : url;

  if (setIsLoading) {
    setIsLoading(!false);
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      sessionStorage.getItem("Token") ?? localStorage.getItem("Token")
    }`,
  };
  const cuerpo = {
    method: CRUD ? CRUD : "POST",
    headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, cuerpo);

    if (!response.ok) {
      throw new Error("Error fetching alerts data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const fetchUniversalDetails = async (
  componentURL,
  detailsID?,
  CRUD?,
  setIsLoading?
) => {
  detailsID == undefined ? (detailsID = "") : detailsID;
  const url = `${baseUrl}/${componentURL}/${detailsID}`;
  if (setIsLoading) {
    setIsLoading(!false);
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      sessionStorage.getItem("Token") ?? localStorage.getItem("Token")
    }`,
  };
  const cuerpo = {
    method: "GET",
    headers,
  };
  try {
    const response = await fetch(url, cuerpo);

    if (!response.ok) {
      throw new Error("Error fetching alerts data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
export const fetchDeleteUsers = async (componentURL, detailsID?, CRUD?) => {
  const url = `${baseUrl}/${componentURL}/${Number(detailsID)}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      sessionStorage.getItem("Token") ?? localStorage.getItem("Token")
    }`,
  };
  const cuerpo = {
    method: "DELETE",
    headers,
  };
  try {
    const response = await fetch(url, cuerpo);

    if (!response.ok) {
      throw new Error("Error fetching alerts data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const fetchUniversalTables = async (
  componentURL,
  data?,
  setIsLoading?,
  detailsID?,
  CRUD?
) => {
  const url = `${baseUrl}/${componentURL}`;
  detailsID ? url + "/" + detailsID : url;

  if (setIsLoading) {
    setIsLoading(!false);
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      sessionStorage.getItem("Token") ?? localStorage.getItem("Token")
    }`,
  };
  const cuerpo = {
    method: CRUD ? CRUD : "POST",
    headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, cuerpo);

    if (!response.ok) {
      throw new Error("Error fetching alerts data");
    }

    // const responseData = await response.json();
    return await response;
  } catch (error) {
    throw error;
  }
};
export const fetchUniversalTables2 = async (
  componentURL: string,
  data?: any,
  setIsLoading?: (loading: boolean) => void,
  isLoading?: boolean,
  detailsID?: string,
  CRUD?: string,
  setErrorMessage?: (error: string) => void
) => {
  const url = `${baseUrl}/${componentURL}`;
  detailsID ? url + "/" + detailsID : url;
  // Actualiza el estado de carga si se proporciona la función setIsLoading
  if (setIsLoading) {
    setIsLoading(!isLoading);
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      sessionStorage.getItem("Token") ?? localStorage.getItem("Token")
    }`,
  };

  const cuerpo: FetchOptions = {
    method: CRUD ?? "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, cuerpo);

    // Verifica si la respuesta es OK (código de estado en el rango 200-299)
    if (!response.ok) {
      // Lanza un error con el estatus y el texto de error
      const errorText = await response.text();
      const errorMessage = `Error ${response.status}: ${errorText}`;
      if (setErrorMessage) {
        setErrorMessage(errorMessage);
      }
      throw new Error(errorMessage);
    }

    // Extrae los datos en formato JSON
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Maneja el error y lo relanza para que pueda ser capturado por el llamador
    if (setErrorMessage) {
      setErrorMessage(`Fetch error: ${error.message}`);
    }
    console.error("Fetch error:", error);
    throw error;
  } finally {
    // Asegúrate de actualizar el estado de carga a falso en cualquier caso
    if (setIsLoading) {
      setIsLoading(false);
    }
  }
};

export const tableauFetch = async (URL?, setIsLoading?) => {
  if (setIsLoading) {
    setIsLoading(!false);
  }
  const cuerpo = {
    method: "GET",
  };
  try {
    const response = await fetch(URL, cuerpo);
    if (!response.ok) {
      throw new Error("Error fetching tableau");
    }

    const responseData = await response.text();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const fetchSearchUniversal = async (URL, setIsLoading, data) => {
  if (setIsLoading) {
    setIsLoading(!false);
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      sessionStorage.getItem("Token") ?? localStorage.getItem("Token")
    }`,
  };

  const cuerpo = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(URL, cuerpo);
    if (!response.ok) {
      throw new Error("Error fetching search universal");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
