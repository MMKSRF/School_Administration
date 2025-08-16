// src/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSchoolReducer from './Slices/createSchoolSlice.js';
import loginReducer from './Slices/loginSlice.js';
import forgotPasswordReducer from './Slices/forgotPasswordSlices.js';
import joinSchoolReducer from './Slices/joinSchoolSlice.js';
import requestSchoolReducer from './Slices/requestSchoolSlice.js';
import classesReducer from './Slices/classesSlice.js';
import reportsReducer from './Slices/reportsSlice.js';
import requestsReducer from './Slices/requestsSlice.js';
import studentsReducer from './Slices/studentsSlice.js';
import teachersReducer from './Slices/teachersSlice.js';

export const store = configureStore({
  reducer: {
    // Authentication and School Setup
    createSchool: createSchoolReducer,
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    joinSchool: joinSchoolReducer,
    requestSchool: requestSchoolReducer,
    
    // Core Application Functionality
    classes: classesReducer,
    reports: reportsReducer,
    requests: requestsReducer,
    students: studentsReducer,
    teachers: teachersReducer
  }
});