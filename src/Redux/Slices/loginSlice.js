import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    formData:{
        schoolId: '',
        password: ''
    },
    loading: false,
    errors: {},
    showPassword: false,
    newErrors: {}
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: { 
        setFormData: (state, action) => {
            state.formData={...state.formData, ...action.payload};

        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setErrors: (state, action) => {
             state.errors = {...state.errors,...action.payload}
        },
        setShowPassword: (state, action) => {
            state.showPassword = action.payload;
        },
        setNewErrors:(state,action)=>{
            if(action.payload === null || Object.keys(action.payload).length === 0 ){
                state.newErrors = {};
                return;
            }

            state.newErrors = {
                ...state.newErrors,
                ...action.payload
            };
        }


    },
});



export const { setFormData, setLoading, setErrors, setShowPassword, setNewErrors } = loginSlice.actions;
export default loginSlice.reducer;