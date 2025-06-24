
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


import {
  // selectFormData,

  selectFullName,
  selectGradeLevel,
  selectSection,
  selectStudentId,
  selectParentContact,
  selectSubjectsTaught,
  selectPhoneNumber,
  selectEmail,
  selectTeacherId,
  selectPassword,
  selectConfirmPassword,

  selectStep,
  selectSelectedSchool,
  selectRole,
  selectLoading,
  selectSuccess

} from '../../../Redux/Selectors/joinSchoolSelectors.js';


import {
  setFormData,
  setStep,
  setSelectedSchool,
  setRole,
  setLoading,
  setSuccess,
} from '../../../Redux/Slices/joinSchoolSlice.js'


const useJoinSchoolForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // const [step, setStep] = useState(1);
  // const [selectedSchool, setSelectedSchool] = useState(null);
  // const [role, setRole] = useState(null);


  const step = useSelector(selectStep);
  const selectedSchool = useSelector(selectSelectedSchool);
  const role = useSelector(selectRole);


  const formData= {
    fullName: useSelector(selectFullName),
    gradeLevel: useSelector(selectGradeLevel),
    section: useSelector(selectSection),
    studentId: useSelector(selectStudentId),
    parentContact: useSelector(selectParentContact),
    subjectsTaught: useSelector(selectSubjectsTaught),
    phoneNumber: useSelector(selectPhoneNumber),
    email: useSelector(selectEmail),
    teacherId: useSelector(selectTeacherId),
    password: useSelector(selectPassword),
    confirmPassword: useSelector(selectConfirmPassword),
  }
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);

  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);


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

    dispatch(setFormData( {  [name]: value }))

  };



  
  const handleSubjectChange = (subject) => {
      const currentSubjects = formData.subjectsTaught.split(',').filter(s => s);
      const index = currentSubjects.indexOf(subject);
      
      if (index > -1) {
        currentSubjects.splice(index, 1);
      } else {
        currentSubjects.push(subject);
      }
      dispatch(setFormData( { subjectsTaught: currentSubjects.join(',') }))

  };




  
  const handleSchoolSelect = (school) => {
    dispatch(setSelectedSchool({school}))
    dispatch(setStep(2));
  };




  
  const handleRoleSelect = (selectedRole) => {
    dispatch(setRole(selectedRole))
    dispatch(setStep(3))
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
    dispatch(setLoading(true))
    setTimeout(() => {
      dispatch(setLoading(false))
      dispatch(setSuccess(true))
      
      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 10000);
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