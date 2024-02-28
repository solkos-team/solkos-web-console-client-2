import { createSlice } from "@reduxjs/toolkit";

var valores = localStorage.getItem("ORG") || [];

export const organization = createSlice({
  name: "organization",
  initialState: valores,
  reducers: {
    addOrg: () => {
      const data = localStorage.getItem("ORG");
      const dt = data === null ? "[]" : data;
      valores = valores + dt;
      return dt;
    },
  },
});

export const { addOrg } = organization.actions;
export default organization.reducer;
