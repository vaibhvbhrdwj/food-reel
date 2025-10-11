import React,{useState,setFormData,setErrors,setTouched} from 'react'
import Galaxy from '../../Background/Galaxy'
function UserRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        } else if (value.trim().length < 2) {
          error = 'First name must be at least 2 characters';
        }
        break;
      
      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        } else if (value.trim().length < 2) {
          error = 'Last name must be at least 2 characters';
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email';
        }
        break;
      
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain uppercase, lowercase, and number';
        }
        break;
      
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        });
        setTouched({});
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '#6b7280' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];
    
    return { 
      strength, 
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || '#6b7280'
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (

<div className='bg-black min-w-screen min-h-screen flex items-center justify-center' style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Galaxy />
      </div>

      <div className='relative z-10 text-white  rounded-2xl shadow-2xl bg-white/[0.02] backdrop-blur-lg border border-white/5 max-w-lg w-full mx-4 px-10'>
        <div className='flex items-center justify-center mb-10 p-10'>
          <div className='relative'>
            <img 
              className='rounded-full h-24 w-24 object-cover border-4 border-white/10 shadow-xl' 
              src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%234A5568"/%3E%3Ccircle cx="50" cy="40" r="15" fill="%23E2E8F0"/%3E%3Cpath d="M30 75 Q30 55 50 55 Q70 55 70 75" fill="%23E2E8F0"/%3E%3C/svg%3E'
              alt='Profile'
            />
            <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10'></div>
          </div>
        </div>
        
        <div className='text-center mb-12'>
          <h1 className='text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
            Register as User
          </h1>
          <p className='text-sm text-white/70'>Provide information to create your account</p>
        </div>
        
        {submitSuccess && (
          <div className='mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center'>
            ✓ Account created successfully!
          </div>
        )}
        
        <div className='space-y-8 px-10'>
          <div className='space-y-3'>
            <label className='block text-sm font-semibold text-white/90 ml-1'>
              First Name <span className='text-red-400'>*</span>
            </label>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Enter your first name'
              className={`w-full px-5 py-4 bg-white/5 border ${
                touched.firstName && errors.firstName 
                  ? 'border-red-500/50' 
                  : 'border-white/10'
              } rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 focus:bg-white/10 backdrop-blur-sm transition-all duration-200`}
            />
            {touched.firstName && errors.firstName && (
              <p className='text-red-400 text-xs ml-1 mt-1'>{errors.firstName}</p>
            )}
          </div>
          
          <div className='space-y-3'>
            <label className='block text-sm font-semibold text-white/90 ml-1'>
              Last Name <span className='text-red-400'>*</span>
            </label>
            <input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Enter your last name'
              className={`w-full px-5 py-4 bg-white/5 border ${
                touched.lastName && errors.lastName 
                  ? 'border-red-500/50' 
                  : 'border-white/10'
              } rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 focus:bg-white/10 backdrop-blur-sm transition-all duration-200`}
            />
            {touched.lastName && errors.lastName && (
              <p className='text-red-400 text-xs ml-1 mt-1'>{errors.lastName}</p>
            )}
          </div>
          
          <div className='space-y-3'>
            <label className='block text-sm font-semibold text-white/90 ml-1'>
              Email Address <span className='text-red-400'>*</span>
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Enter your email'
              className={`w-full px-5 py-4 bg-white/5 border ${
                touched.email && errors.email 
                  ? 'border-red-500/50' 
                  : 'border-white/10'
              } rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 focus:bg-white/10 backdrop-blur-sm transition-all duration-200`}
            />
            {touched.email && errors.email && (
              <p className='text-red-400 text-xs ml-1 mt-1'>{errors.email}</p>
            )}
          </div>
          
          <div className='space-y-3'>
            <label className='block text-sm font-semibold text-white/90 ml-1'>
              Password <span className='text-red-400'>*</span>
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Create a password'
                className={`w-full px-5 py-4 bg-white/5 border ${
                  touched.password && errors.password 
                    ? 'border-red-500/50' 
                    : 'border-white/10'
                } rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 focus:bg-white/10 backdrop-blur-sm transition-all duration-200`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors'
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className='text-red-400 text-xs ml-1 mt-1'>{errors.password}</p>
            )}
            {formData.password && !errors.password && (
              <div className='space-y-2 mt-2'>
                <div className='flex items-center gap-2'>
                  <div className='flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden'>
                    <div 
                      className='h-full transition-all duration-300'
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                        backgroundColor: passwordStrength.color
                      }}
                    />
                  </div>
                  <span className='text-xs' style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className='pt-6'>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className='w-full px-4 py-4 bg-gradient-to-r from-blue-500/70 to-purple-600/70 hover:from-blue-600/80 hover:to-purple-700/80 disabled:from-gray-500/50 disabled:to-gray-600/50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm'
            >
              {isSubmitting ? (
                <span className='flex items-center justify-center gap-2'>
                  <span className='inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
          
          <div className='text-center pt-4'>
            <p className='text-sm text-white/60'>
              Already have an account?{' '}
              <a href='#' className='text-blue-400 hover:text-blue-300 font-semibold transition-colors'>
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegister