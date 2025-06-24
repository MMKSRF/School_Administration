import { NavLink } from 'react-router-dom';
import BasicInput from '../../Ui/BasicInput';
import SocialLoginButtons from './SocialLoginButtons';
import { useSelector , useDispatch} from 'react-redux';



import {selectPassword,selectSchoolId,selectLoading,selectErrors,selectShowPassword,selectNewErrors} from '../../../Redux/Selectors/loginSelectors';
import { setFormData as setFormDataRedux  ,setErrors, setLoading, setShowPassword ,setNewErrors} from '../../../Redux/Slices/loginSlice'


const LoginForm = () => {

  const dispatch = useDispatch();

  const formData = {
    schoolId: useSelector(selectSchoolId) || '',
    password: useSelector(selectPassword) || ''
  };

  const loading = useSelector(selectLoading);
  const errors = useSelector(selectErrors);
  const showPassword = useSelector(selectShowPassword);
  const newErrors = useSelector(selectNewErrors) || {};







  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormDataRedux({ [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      dispatch(setErrors({ [name]: '' }));
    }
  };
  
  const togglePasswordVisibility = () => {
    dispatch(setShowPassword(!showPassword))
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation

    dispatch(setNewErrors({})); // Clear previous new errors

    if (!formData.schoolId.trim()) {
      dispatch(setNewErrors({schoolId:'School ID is required'}))
    }
    if (!formData.password) {
      dispatch(setNewErrors({password:'Password is required'}))
    } else if (formData.password.length < 6) {
      dispatch(setNewErrors({password:'Password must be at least 6 characters'}))
    }
    
    if (Object.keys(newErrors).length > 0) {
      dispatch(setErrors(newErrors))
      return;
    }
    
    // Simulate login process
    dispatch(setLoading(true))
    setTimeout(() => {
      dispatch(setLoading(false))
      // In a real app, you would redirect to dashboard here
      alert('Login successful! Redirecting to dashboard...');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6 login-form">
        <BasicInput
          label='School ID or Name'
          type="text"
          name="schoolId"
          placeholder="Enter your school ID or name"
          value={formData.schoolId}
          onChange={handleChange}
          error={errors.schoolId}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>}
        />
        
        <BasicInput
          label='Password'
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>}
          buttons={
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          }
        />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="remember" className="ml-2 text-gray-700 text-sm">
              Remember me
            </label>
          </div>
          
          <NavLink to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            Forgot password?
          </NavLink>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md transition-all ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-indigo-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging In...
              </div>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </div>
        
        <div className="pt-4">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="px-4 text-gray-500 bg-white text-sm">or continue with</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          
          <SocialLoginButtons />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;