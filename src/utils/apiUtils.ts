// apiUtils.js
const baseUrl = "https://universal-console-server-b7agk5thba-uc.a.run.app";

export const fetchCoolers = async (path, setIsLoading?) => {  
  if(setIsLoading){
    setIsLoading(!false);
  }
  const url = `${baseUrl}/coolers`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: "KOF",
    class: "STK",
    algorithm: ["INSTALLED"],
    path: path,
    page_size: 100,
    page_number: 1  
  };
  console.log(data)
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

    return {
      serial_number: serialNumber,
      ...responseData,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchOutlets = async (path) => {
  const url = `${baseUrl}/outlets`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: "KOF",
    page_size: 100,
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

export const fetchInsights = async () => {
  const url = `${baseUrl}/insights`;
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
      throw new Error("Error fetching insights");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
