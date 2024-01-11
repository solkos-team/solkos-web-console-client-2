// GetPath for filter
const baseUrl:string = "https://universal-console-server-b7agk5thba-uc.a.run.app/paths";

export const fetchPath = async (path?:[]) => {
  path === undefined ? [] : path  
  const url = `${baseUrl}`;
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    customer: "KOF",
    path: path
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