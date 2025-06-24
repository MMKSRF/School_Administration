import {configureStore} from '@reduxjs/toolkit';
import createSchoolReducer from './Slices/createSchoolSlice.js';
import loginReducer from './Slices/loginSlice.js';
import forgotPasswordReducer from './Slices/forgotPasswordSlices.js';
import joinSchoolReducer from './Slices/joinSchoolSlice.js';
import requestSchoolReducer from './Slices/requestSchoolSlice.js';


export const store = configureStore({
    reducer:{
        createSchool: createSchoolReducer,
        login: loginReducer,
        forgotPassword: forgotPasswordReducer,
        joinSchool: joinSchoolReducer,
        requestSchool: requestSchoolReducer,
    }
})