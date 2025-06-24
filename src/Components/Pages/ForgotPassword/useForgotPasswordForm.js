import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {useDispatch, useSelector} from "react-redux";


import   {
  setFormData,
  setErrors,
  setLoading,
  setStep,
  setCountdown
} from '../../../Redux/Slices/forgotPasswordSlices.js'

import {

  selectSchoolId,
  selectRole,
  selectContact,
  selectResetCode,
  selectNewPassword,
  selectConfirmPassword,


    selectLoading,
    selectStep,
    selectErrors,
    selectCountdown
} from '../../../Redux/Selectors/forgotPasswordSlectors.js'



const useForgotPasswordForm = () => {

  const navigate = useNavigate();


  const dispatch = useDispatch();

  const formData = {
    schoolId: useSelector(selectSchoolId),
    role: useSelector(selectRole),
    contact: useSelector(selectContact),
    resetCode: useSelector(selectResetCode),
    newPassword: useSelector(selectNewPassword),
    confirmPassword: useSelector(  selectConfirmPassword
    ),
  };

  // const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState({});
  // const [countdown, setCountdown] = useState(0);
  // const [step, setStep] = useState(1);




  const loading = useSelector(selectLoading);
  const errors = useSelector(selectErrors);
  const countdown = useSelector(selectCountdown);
  const step = useSelector(selectStep);







  // Sample schools data
  const schools = [
    { id: 1, name: "Addis Ababa Science & Technology University", region: "Addis Ababa" },
    { id: 2, name: "Hawassa University School", region: "Sidama" },
    { id: 3, name: "Mekelle International Academy", region: "Tigray" },
    { id: 4, name: "Bahir Dar Model School", region: "Amhara" },
    { id: 5, name: "Jimma Preparatory School", region: "Oromia" },
    { id: 6, name: "Dire Dawa Secondary School", region: "Dire Dawa" },
  ];


  
  // Countdown timer for resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => dispatch(setCountdown(countdown - 1)), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);





  const handleChange = (e) => {
    const { name, value } = e.target;

    // Always update form data
    dispatch(setFormData({ [name]: value }));

    // Email and Phone validation for 'contact' field
    if (name === 'contact') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?\d{10,15}$/;

      if (value === '' || emailRegex.test(value) || phoneRegex.test(value)) {
        // Valid input: clear error
        dispatch(setErrors({ [name]: '' }));
      } else {
        // Invalid input: set error
        dispatch(setErrors({ [name]: 'Please enter a valid email or phone number.' }));
      }
    } else {
      // For other fields: just clear error when typing
      if (errors[name]) {
        dispatch(setErrors({ [name]: '' }));
      }
    }
  };








  const validateStep = () => {

    const newErrors = {};
    
    if (step === 1) {
      if (!formData.schoolId.trim()) newErrors.schoolId = 'School selection is required';
      if (!formData.role) newErrors.role = 'Please select your role';
      if (!formData.contact.trim()) newErrors.contact = 'Email or phone number is required';
    }
    
    if (step === 2) {
      if (!formData.resetCode) newErrors.resetCode = 'Reset code is required';
      else if (formData.resetCode.length !== 6) newErrors.resetCode = 'Code must be 6 digits';
    }
    
    if (step === 3) {
      if (!formData.newPassword) newErrors.newPassword = 'Password is required';
      else if (formData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
      if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    dispatch(setErrors(newErrors));

    return Object.keys(newErrors).length === 0;
  };






  
  const handleSendCode = () => {
    if (validateStep()) {
      dispatch(setLoading(true))
      
      // Simulate API call to send reset code
      setTimeout(() => {
        dispatch(setLoading(false));
        dispatch(setStep(2));
        dispatch(setCountdown(20)); // 20 sec countdown
      }, 1500);
    }
  };






  
  const handleVerifyCode = () => {
    if (validateStep()) {
      dispatch(setLoading(true));
      
      // Simulate code verification
      setTimeout(() => {
        dispatch(setLoading(false));
        dispatch(setStep(3))
      }, 1500);
    }
  };






  
  const handleResetPassword = () => {
    if (validateStep()) {
      dispatch(setLoading(true))
      
      // Simulate password reset
      setTimeout(() => {
        dispatch(setLoading(false))
        navigate('/password-reset-success');
      }, 1500);
    }
  };






  
  const handleResendCode = () => {
    dispatch(setLoading(true))
    
    // Simulate resending code
    setTimeout(() => {
      dispatch(setLoading(false))
      dispatch(setCountdown(120))
      alert('New reset code has been sent to your contact method');
    }, 1000);
  };






  return {
    step,
    formData,
    loading,
    errors,
    countdown,
    schools,
    handleChange,
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
    handleResendCode,
    setStep
  };
};

export default useForgotPasswordForm;