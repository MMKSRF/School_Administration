import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    formData: {
        fullName: '',
        gradeLevel: '',
        section: '',
        studentId: '',
        parentContact: '',
        subjectsTaught: '',
        phoneNumber: '',
        email: '',
        teacherId: '',
        password: '',
        confirmPassword: ''
    },


    step:1,
    selectedSchool: null,
    role: null,


    loading: false,
    success: false,

}



const joinSchoolSlice = createSlice({
    name: "joinSchool",
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = {...state.formData, ...action.payload};
        },
        setStep: (state, action)=>{
            state.step = action.payload;
        },
        setSelectedSchool: (state, action)=>{
            state.selectedSchool = action.payload;
        },
        setRole: (state, action)=>{
            state.role = action.payload;
        },
        setLoading: (state, action)=> {
            state.loading = action.payload;
        },
        setSuccess: (state, action)=> {
            state.success = action.payload;
        }


    }
})



export const {
    setFormData,
    setStep,
    setSelectedSchool,
    setRole,
    setLoading,
    setSuccess,

} = joinSchoolSlice.actions;


export default joinSchoolSlice.reducer;