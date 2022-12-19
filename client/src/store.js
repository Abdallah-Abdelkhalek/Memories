import { configureStore } from '@reduxjs/toolkit'
import postReducer from './reducers/postsSlice'
import authReducer from './reducers/authSlice'
export default configureStore({
    reducer:{
        posts: postReducer,
        auth: authReducer,
    }
})