import { useDispatch, useSelector } from 'react-redux';
import {
  setFormData,
  setLoading,
  setSuccess,
  setError,
  setErrors,
  setStep,
} from '../../../Redux/Slices/createSchoolSlice';

import {
  selectSchoolName,
  selectSchoolId,
  selectEmail,
  selectAdminName,
  selectAdminEmail,
  selectPassword,
  selectConfirmPassword,
  selectSchoolType,
  selectRegion,
  selectPhoneNumber,
  selectSchoolSize,
  selectAcademicLevels,



  selectLoading,
  selectSuccess,
  selectError,
  selectStep,
  selectErrors
} from '../../../Redux/Selectors/createSchoolSelectors';

const useCreateSchoolForm = () => {
  const dispatch = useDispatch();

  const formData = {
    schoolName: useSelector(selectSchoolName),
    schoolId: useSelector(selectSchoolId),
    email: useSelector(selectEmail),
    adminName: useSelector(selectAdminName),
    adminEmail: useSelector(selectAdminEmail),
    password: useSelector(selectPassword),
    confirmPassword: useSelector(selectConfirmPassword),
    schoolType: useSelector(selectSchoolType),
    region: useSelector(selectRegion),
    schoolSize: useSelector(selectSchoolSize),
    phoneNumber: useSelector(selectPhoneNumber),
    academicLevels: useSelector(selectAcademicLevels),
  };

  

  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const error = useSelector(selectError);
  const step = useSelector(selectStep);
  const errors = useSelector(selectErrors);



  const ethiopianRegions = [
    'Addis Ababa',
    'Afar',
    'Amhara',
    'Benishangul-Gumuz',
    'Dire Dawa',
    'Gambela',
    'Harari',
    'Oromia',
    'Sidama',
    'Somali',
    'South West Ethiopia',
    'Southern Nations, Nationalities, and Peoples',
    'Tigray',
  ];

  const academicLevels = [
    { id: 'kg', label: 'Kindergarten (KG)', icon: '🧒' },
    { id: 'primary', label: 'Primary School (Grades 1-8)', icon: '📚' },
    { id: 'secondary', label: 'Secondary School (Grades 9-12)', icon: '🎓' },
    { id: 'vocational', label: 'Vocational Training', icon: '🔧' },
    { id: 'university', label: 'University/College', icon: '🏛️' },
  ];

  const schoolSizes = [
    { label: 'Small (1-100 students)', value: 'small' },
    { label: 'Medium (101-500 students)', value: 'medium' },
    { label: 'Large (501-1000 students)', value: 'large' },
    { label: 'Extra Large (1000+ students)', value: 'xlarge' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));

    if (errors[name]) {
      dispatch(setErrors({ [name]: '' }));
    }
  };

  const handleAcademicLevelChange = (level) => {
    const updatedLevels = formData.academicLevels?.includes(level)
      ? formData.academicLevels.filter((l) => l !== level)
      : [...(formData.academicLevels || []), level];

    dispatch(setFormData({ academicLevels: updatedLevels }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.schoolName.trim()) newErrors.schoolName = 'School name is required';
      if (!formData.schoolId.trim()) newErrors.schoolId = 'School ID is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required';
    }

    if (step === 2) {
      if (!formData.adminName.trim()) newErrors.adminName = 'Admin name is required';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.schoolType) newErrors.schoolType = 'Please select school type';
      if (!formData.region) newErrors.region = 'Please select region';
      if (!formData.adminEmail.trim()) newErrors.adminEmail = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.adminEmail)) newErrors.adminEmail = 'Email is invalid';
    }

    dispatch(setErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      dispatch(setStep(step + 1));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateStep()) {
      dispatch(setLoading(true));
      dispatch(setError(null));

      setTimeout(() => {
        const shouldSucceed = Math.random() > 0.3;

        if (shouldSucceed) {
          dispatch(setSuccess(true));
        } else {
          dispatch(
            setError({
              message: 'Account creation failed. Please check your information and try again.',
              details:
                'Our servers encountered an issue processing your request. This might be due to network issues or invalid data.',
            })
          );
        }
        dispatch(setLoading(false));
      }, 2000);
    }
  };

  return {
    formData,
    errors,
    loading,
    success,
    error,
    step,
    setStep,
    setFormData,

    ethiopianRegions,
    academicLevels,
    schoolSizes,
    handleChange,
    handleAcademicLevelChange,
    handleNext,
    handleSubmit,
  };
};

export default useCreateSchoolForm;
