import {configureStore} from '@reduxjs/toolkit';
import createSchoolReducer from './Slices/createSchoolSlice.js';
import loginReducer from './Slices/loginSlice.js';


export const store = configureStore({
    reducer:{
        createSchool: createSchoolReducer,
        login: loginReducer
    }
})