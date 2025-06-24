import {createSlice} from "@reduxjs/toolkit";

const initialState={
    formData:{
        schoolId: '',
        role: '',
        contact: '',
        resetCode: '',
        newPassword: '',
        confirmPassword: ''
    },
    loading:false,
    errors:{},
    countdown: 0,
    step:1,
}


const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = {...state.formData, ...action.payload};
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setErrors: (state, action) => {
            if(action.payload === null || Object.keys(action.payload).length === 0){
                state.errors = {}
                return;
            }

            state.errors = {...state.errors, ...action.payload};

        },
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setCountdown: (state, action) => {
            state.countdown = action.payload;
        }
    }
})




export const  {setFormData,setErrors,setLoading,setStep,setCountdown } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;