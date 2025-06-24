import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useJoinSchoolForm = () => {
  const [step, setStep] = useState(1);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
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
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  // Sample schools data
  const schools = [
    { id: 1, name: "Addis Ababa Science & Technology University", region: "Addis Ababa" },
    { id: 2, name: "Hawassa University School", region: "Sidama" },
    { id: 3, name: "Mekelle International Academy", region: "Tigray" },
    { id: 4, name: "Bahir Dar Model School", region: "Amhara" },
    { id: 5, name: "Jimma Preparatory School", region: "Oromia" },
    { id: 6, name: "Dire Dawa Secondary School", region: "Dire Dawa" },
  ];
  
  // Grade levels from KG to Grade 12
  const gradeLevels = [
    "KG1", "KG2", "KG3", 
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", 
    "Grade 10", "Grade 11", "Grade 12"
  ];
  
  // Sections A-F
  const sections = ["A", "B", "C", "D", "E", "F"];
  
  // Subjects for teachers
  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", 
    "English", "Amharic", "History", "Geography",
    "Civics", "ICT", "Physical Education", "Art",
    "Music", "Economics", "Business"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubjectChange = (subject) => {
    setFormData(prev => {
      const currentSubjects = prev.subjectsTaught.split(',').filter(s => s);
      const index = currentSubjects.indexOf(subject);
      
      if (index > -1) {
        currentSubjects.splice(index, 1);
      } else {
        currentSubjects.push(subject);
      }
      
      return { ...prev, subjectsTaught: currentSubjects.join(',') };
    });
  };
  
  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setStep(2);
  };
  
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(3);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (role === 'student') {
      if (!formData.gradeLevel) errors.gradeLevel = "Grade level is required";
      if (!formData.section) errors.section = "Section is required";
    }
    if (role === 'teacher') {
      if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
      if (!formData.subjectsTaught) errors.subjectsTaught = "Please select at least one subject";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(errors).length > 0) {
      alert(`Please fix the following errors:\n${Object.values(errors).join('\n')}`);
      return;
    }
    
    // Simulate form submission
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  return {
    step,
    selectedSchool,
    role,
    formData,
    loading,
    success,
    schools,
    gradeLevels,
    sections,
    subjects,
    handleInputChange,
    handleSubjectChange,
    handleSchoolSelect,
    handleRoleSelect,
    handleSubmit,
    setStep
  };
};

export default useJoinSchoolForm;