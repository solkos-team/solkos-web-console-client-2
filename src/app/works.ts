import { createSlice } from "@reduxjs/toolkit";


var valores = localStorage.getItem('PATH') || '[]'

export const works = createSlice({
    name:"works",
    initialState : valores,
    reducers: {
        addPath : ():string =>{
            const data = localStorage.getItem('PATH')
            const dt = (data == null) ? '[]' : data            
            valores = valores + dt
            return dt
        }
    }
});

export const {addPath} = works.actions
export default works.reducer;