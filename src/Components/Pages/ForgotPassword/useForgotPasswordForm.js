import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useForgotPasswordForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    schoolId: '',
    role: '',
    contact: '',
    resetCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(0);
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
  
  // Countdown timer for resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSendCode = () => {
    if (validateStep()) {
      setLoading(true);
      
      // Simulate API call to send reset code
      setTimeout(() => {
        setLoading(false);
        setStep(2);
        setCountdown(120); // 2 minutes countdown
      }, 1500);
    }
  };
  
  const handleVerifyCode = () => {
    if (validateStep()) {
      setLoading(true);
      
      // Simulate code verification
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 1500);
    }
  };
  
  const handleResetPassword = () => {
    if (validateStep()) {
      setLoading(true);
      
      // Simulate password reset
      setTimeout(() => {
        setLoading(false);
        navigate('/password-reset-success');
      }, 1500);
    }
  };
  
  const handleResendCode = () => {
    setLoading(true);
    
    // Simulate resending code
    setTimeout(() => {
      setLoading(false);
      setCountdown(120);
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