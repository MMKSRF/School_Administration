import { useState } from 'react';

const useRequestSchoolForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
  });
  
  const [searchResults, setSearchResults] = useState([]);
  const [schoolFound, setSchoolFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, document: e.target.files[0] }));
  };
  
  const handleRecheck = () => {
    if (!formData.searchSchool) {
      alert("Please enter a school name to search");
      return;
    }
    
    // Simulate search
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      // Filter schools based on search criteria
      const results = schools.filter(school => 
        school.name.toLowerCase().includes(formData.searchSchool.toLowerCase()) &&
        (!formData.searchRegion || school.region === formData.searchRegion)
      );
      
      setSearchResults(results);
      
      if (results.length > 0) {
        setSchoolFound(true);
      } else {
        setSchoolFound(false);
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
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