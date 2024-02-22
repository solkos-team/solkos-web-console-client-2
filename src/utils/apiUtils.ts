const baseUrl = "https://universal-console-server-b7agk5thba-uc.a.run.app";

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
  CRUD?
) => {
  detailsID == undefined ? (detailsID = "") : detailsID;
  const url = `${baseUrl}/${componentURL}/${detailsID}`;
  const headers = {
    "Content-Type": "application/json",
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
