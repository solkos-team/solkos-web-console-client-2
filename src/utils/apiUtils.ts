// apiUtils.js
const baseUrl = "https://universal-console-server-b7agk5thba-uc.a.run.app";

export const fetchCoolers = async () => {
  const url = `${baseUrl}/coolers`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: "KOF",
    class: "STK",
    algorithm: ["INSTALLED"],
    page_size: 100,
    page_number: 1,
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

// En tu función fetchCoolerDetails
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

    // Incluir el número de serie en la respuesta
    return {
      serial_number: serialNumber,
      // Otras propiedades del enfriador
      ...responseData,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchOutlets = async () => {
  const url = `${baseUrl}/outlets`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: "KOF",
    page_size: 100,
    page_number: 1,
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

export const fetchAlerts = async () => {
  const url = `${baseUrl}/alerts`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: "KOF",
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
