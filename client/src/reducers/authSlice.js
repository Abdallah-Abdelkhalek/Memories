import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';


let userFromLocalStorage = (localStorage.getItem("user" || "[]"));
let tokenFromLocalStorage = (localStorage.getItem("user" || "[]"));
const initialState = {
    currentUser: JSON.parse(userFromLocalStorage),
    token: JSON.parse(tokenFromLocalStorage)
}
export const signin = createAsyncThunk('auth/signin',async (formData) => {
    try {
        const {data} = await api.signIn(formData);
        return data;

    } catch (error) {
        console.log(error);
    }
}) 

export const signup = createAsyncThunk('auth/signup',async (formData)=>{
    try {
        const {data} = await api.signUp(formData);
        //history.push('/');
        return data;
    } catch (error) {
        console.log(error);
    }
}) 

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout (state,action) {
            state = null;
        }
    },
    extraReducers:{
        [signin.pending]: (state) => {console.log('pending')},
        [signin.fulfilled]: (state,{payload}) =>{
            if(payload !== undefined){
            state.currentUser = payload.result;
            state.token = payload.token;
            localStorage.setItem("user",JSON.stringify(payload.result))
            localStorage.setItem("token",JSON.stringify(payload.token))
            console.log("Succesfully signed in")
            }
        },
        [signin.rejected]: (state,{payload}) =>{
            console.log(payload.message)
        },
        [signup.pending]: (state) => {console.log('pending')},
        [signup.fulfilled]: (state,{payload}) =>{
            if(payload !== undefined){
                state.currentUser = payload.result;
                state.token = payload.token;
            localStorage.setItem("user",JSON.stringify(payload.result))
            localStorage.setItem("token",JSON.stringify(payload.token))
            console.log('Signed up successfully');
            }
        },
        [signup.rejected]: (state,{payload}) =>{
            console.log(payload)
        }
    }

}) 

export const {actions} = authSlice;
export default authSlice.reducer;