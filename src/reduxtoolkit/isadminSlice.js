import {createSlice} from '@reduxjs/toolkit'

const initialState = { 
    isAdmin:false
}

const isadminSlice = createSlice({
    name:'isadmin',
    initialState,
    reducers:{
        setisAdmin:(state,action)=>{
            state.isAdmin=action.payload
        }
    }
})

export const {setisAdmin} = isadminSlice.actions
export default isadminSlice.reducer