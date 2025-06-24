import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    formData:{
        // Step 1: Recheck fields
        searchSchool: '',
        searchRegion: '',

        // Step 2: Requester Info
        fullName: '',
        requesterRole: '',
        phoneNumber: '',
        email: '',

        // Step 3: School Info
        schoolName: '',
        schoolType: '',
        gradeRange: '',
        region: '',
        subCity: '',
        woreda: '',
        schoolEmail: '',
        schoolPhone: '',
        schoolWebsite: '',
        notes: '',

        // Step 4: Upload
        document: null
    },



    step:1,
    searchResults:[],
    schoolFound:false,
    loading:false,
    success:false
}


const requestSchoolSlice = createSlice({
    name: 'requestSchool',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = {...state.formData, ...action.payload};
        },
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = [...state.searchResults,...action.payload]
        },
        setSchoolFound: (state, action) => {
            state.schoolFound = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        }


    }
})


export const {
    setFormData,
    setStep,
    setSearchResults,
    setSchoolFound,
    setLoading,
    setSuccess,
} = requestSchoolSlice.actions

export default requestSchoolSlice.reducer;
