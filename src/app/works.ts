import { createSlice } from "@reduxjs/toolkit";


var valores = '[]'

export const works = createSlice({
    name:"works",
    initialState : valores,
    reducers: {
        addPath : ():string =>{
            const data = localStorage.getItem('PATH' || '[]')
            const dt = (data == null) ? '[]' : data
            // console.log('funciona metodo',dt)
            valores = valores + dt
            return dt
        }
    }
});

export const {addPath} = works.actions
export default works.reducer;