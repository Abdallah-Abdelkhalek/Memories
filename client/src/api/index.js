import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('token'))
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))} `

    return req;
});

const currentUserId = JSON.parse(localStorage.getItem('user'))

export const fetchPosts = () => API.get('/posts');
export const createPost = (newData) => API.post('/posts',{...newData ,id:currentUserId._id});
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost); 
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id)=> API.patch(`/posts/${id}/likePost`);

export const signIn = (FormData) =>API.post('/user/signin',FormData);
export const signUp = (FormData) =>API.post('/user/signup',FormData);