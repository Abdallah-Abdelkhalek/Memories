import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';



const initialState = {
    dbPosts: [],
    loading:null,
    errMsg : "",
    editPost:""
}

export const getPosts = createAsyncThunk('posts/getPosts',async () => {
    try {
        const {data} = await api.fetchPosts();
        return data;
    } catch (error) {
        return error.response.data;
    }
})

export const updatePost = createAsyncThunk('posts/updatePost',async (id, post) => {
    try {
        const {data} = await api.updatePost(id,post);
        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
})

export const deletePost = createAsyncThunk('posts/deletePost',async (id) => {
    try {
        const {data} = await api.deletePost(id);
        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
})
export const likePost = createAsyncThunk('posts/likePost',async (id) => {
    try {
        const {data} = await api.likePost(id);
        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
})


export const postsSlice = createSlice({
name: 'posts',
initialState,
reducers: {
    getPost (state,action) {
        state.editPost = action.payload;
    }
},
extraReducers:{
        [getPosts.pending]: (state) => {state.loading = true},   

        [getPosts.fulfilled]: (state,{payload}) =>{
            state.dbPosts = payload;
            state.loading = false;
        },
        [getPosts.rejected]: (state,{payload}) =>{
            console.log('why man',payload)
            state.errMsg = payload;
            state.loading = false;
        },
        [updatePost.pending]: (state) => {
            console.log('pending');
        },
        [updatePost.fulfilled]: (state, {payload}) => {
            const index = state.dbPosts.findIndex(post => post._id === payload._id);
            state.dbPosts[index] = {
                ...state.dbPosts[index],
                ...payload,
            };
        },
        [deletePost.fulfilled]: (state, {payload}) =>{
            console.log("post Deleted");
        },
        [likePost.fulfilled]: (state, {payload}) =>{
            console.log("post Liked");
        }
    }
}
)


export const { actions } = postsSlice;
export default postsSlice.reducer;