import {useDispatch, useSelector} from 'react-redux';
import {
  // selectFormData,

  selectSearchSchool,
  selectSearchRegion,

  selectFullName,
  selectRequesterRole,
  selectPhoneNumber,
  selectEmail,

  selectSchoolName,
  selectSchoolType,
  selectGradeRange,
  selectRegion,
  selectSubCity,
  selectWoreda,
  selectSchoolEmail,
  selectSchoolPhone,
  selectSchoolWebsite,
  selectNotes,

  selectDocument,


  selectStep,
  selectSearchResults,
  selectSchoolFound,
  selectLoading,
  selectSuccess,



} from '../../../Redux/Selectors/requestSchoolSelectors.js'

import {
  setFormData,
  setStep,
  setSearchResults,
  setSchoolFound,
  setLoading,
  setSuccess,
} from '../../../Redux/Slices/requestSchoolSlice.js'


const useRequestSchoolForm = () => {

  const dispatch = useDispatch();


  const formData = {
    // Step 1: Recheck fields
    searchSchool: useSelector(selectSearchSchool),
    searchRegion: useSelector(selectSearchRegion),

    // Step 2: Requester Info
    fullName: useSelector(selectFullName),
    requesterRole: useSelector(selectRequesterRole),
    phoneNumber: useSelector(selectPhoneNumber),
    email: useSelector(selectEmail),

    // Step 3: School Info
    schoolName: useSelector(selectSchoolName),
    schoolType: useSelector(selectSchoolType),
    gradeRange: useSelector(selectGradeRange),
    region: useSelector(selectRegion),
    subCity: useSelector(selectSubCity),
    woreda: useSelector(selectWoreda),
    schoolEmail: useSelector(selectSchoolEmail),
    schoolPhone: useSelector(selectSchoolPhone),
    schoolWebsite: useSelector(selectSchoolWebsite),
    notes: useSelector(selectNotes),

    // Step 4: Upload
    document: useSelector(selectDocument),
  };


  const step = useSelector(selectStep);

  const searchResults = useSelector(selectSearchResults);
  const schoolFound = useSelector(selectSchoolFound);
  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);


  // Sample schools data
  const schools = [
    { id: 1, name: "Addis Ababa Science & Technology University", region: "Addis Ababa", type: "University" },
    { id: 2, name: "Hawassa University School", region: "Sidama", type: "Secondary" },
    { id: 3, name: "Mekelle International Academy", region: "Tigray", type: "Primary/Secondary" },
    { id: 4, name: "Bahir Dar Model School", region: "Amhara", type: "Primary/Secondary" },
    { id: 5, name: "Jimma Preparatory School", region: "Oromia", type: "Secondary" },
    { id: 6, name: "Dire Dawa Secondary School", region: "Dire Dawa", type: "Secondary" },
  ];



  // Ethiopian regions
  const regions = [
    "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", 
    "Dire Dawa", "Gambela", "Harari", "Oromia", 
    "Sidama", "Somali", "South West Ethiopia", 
    "Southern Nations, Nationalities, and Peoples", "Tigray"
  ];



  // School types
  const schoolTypes = [
    "Kindergarten (KG)", 
    "Primary School (Grades 1-8)", 
    "Secondary School (Grades 9-12)", 
    "Primary & Secondary Combined", 
    "University/College", 
    "Vocational/Training Institute"
  ];




  // Grade ranges
  const gradeRanges = [
    "KG only",
    "KG to Grade 4",
    "KG to Grade 8",
    "KG to Grade 12",
    "Grade 1 to Grade 8",
    "Grade 1 to Grade 12",
    "Grade 9 to Grade 12"
  ];





  // Requester roles
  const requesterRoles = [
    "Student",
    "Teacher",
    "Parent",
    "School Staff",
    "Administrator",
    "Other"
  ];




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };




  const handleFileChange = (e) => {
    dispatch(setFormData( { document: e.target.files[0] }))
  };




  const handleRecheck = () => {
    if (!formData.searchSchool) {
      alert("Please enter a school name to search");
      return;
    }
    
    // Simulate search
    dispatch(setLoading(true))
    setTimeout(() => {
      dispatch(setLoading(false))

      
      // Filter schools based on search criteria
      const results = schools.filter(school => 
        school.name.toLowerCase().includes(formData.searchSchool.toLowerCase()) &&
        (!formData.searchRegion || school.region === formData.searchRegion)
      );
      
      dispatch(setSearchResults(results))
      
      if (results.length > 0) {
        dispatch(setSchoolFound(true))
      } else {
        dispatch(setSchoolFound(false))
      }
    }, 1000);
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.requesterRole) errors.requesterRole = "Your role is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!formData.schoolName) errors.schoolName = "School name is required";
    if (!formData.schoolType) errors.schoolType = "School type is required";
    if (!formData.schoolEmail) errors.schoolEmail = "School email is required";
    if (!formData.schoolPhone) errors.schoolPhone = "School phone is required";
    
    if (Object.keys(errors).length > 0) {
      // Show errors
      alert(`Please fix the following errors:\n${Object.values(errors).join('\n')}`);
      return;
    }
    
    // Simulate form submission
    dispatch(setLoading(true))
    setTimeout(() => {
      dispatch(setLoading(false))
      dispatch(setSuccess(true))
    }, 2000);
  };





  return {
    step,
    formData,
    searchResults,
    schoolFound,
    loading,
    success,
    regions,
    schoolTypes,
    gradeRanges,
    requesterRoles,
    handleInputChange,
    handleFileChange,
    handleRecheck,
    handleSubmit,
    setStep
  };
};

export default useRequestSchoolForm;