    import {createSlice} from '@reduxjs/toolkit'

    const initialState =  {
        formData:{ 
            schoolName: '',
            schoolId: '',
            email: '', //This is the school Email
            adminName: '',
            adminEmail: '',
            password: '',
            confirmPassword: '',
            schoolType: '', // USELESS
            region: '', // USELESS
            phoneNumber: '', // The school phone number
            schoolSize: '',
            role: 'admin',

            
            academicLevels: [] ,},// USELESS
            
            loading: false,
            success: false,
            error: null,
            step:1,
            errors:{},
        }

    const createSchoolSlice = createSlice({
        name: 'createSchool',
        initialState,
        reducers: { 


            setFormData: (state, action) => {
                state.formData = {
                    ...state.formData,
                    ...action.payload
                };
                console.log('Action Payload:', action.payload);
            },
            setLoading: (state, action) => {
                state.loading = action.payload;
            },
            setSuccess: (state, action) => {
                state.success = action.payload;

            },
            setError: (state, action) => {
                state.error = action.payload;
            },
            setErrors: (state, action) => {
                state.errors = {
                    ...state.errors,
                    ...action.payload
                };
            },
            setStep: (state, action) => {
                state.step = action.payload;
                console.log('Current Step:', state.step);
            }


            
        }
    })

    export const {

        setLoading,
        setSuccess,
        setError,
        setFormData,
        setErrors,
        setStep,

    } = createSchoolSlice.actions;






  
export default createSchoolSlice.reducer;