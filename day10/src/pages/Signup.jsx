import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../schemas/validationSchemas';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(signupSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.email === data.email);
      
      if (existingUser) {
        setServerError('User with this email already exists');
        return;
      }
      
      const newUser = { 
        name: data.name, 
        email: data.email, 
        password: data.password 
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Show success message briefly
      setIsLoading(false);
      setServerError('');
      setSuccessMessage('Account created successfully! Logging you in...');
      
      // Wait a moment to show success, then auto-login
      setTimeout(() => {
        login({ name: data.name, email: data.email, id: Date.now() });
        reset();
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      setServerError('Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiUser className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 font-opensans">
            Join our platform to get started
          </p>
        </div>
        
        {/* Error Message */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm font-medium">{serverError}</p>
          </div>
        )}
        
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-3"></div>
              <p className="text-emerald-600 text-sm font-medium">{successMessage}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              {...register('name')} 
              className={`input-field ${errors.name ? 'border-red-300 focus:border-red-500' : ''}`} 
              placeholder="Enter your full name" 
            />
            {errors.name && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              {...register('email')} 
              className={`input-field ${errors.email ? 'border-red-300 focus:border-red-500' : ''}`} 
              placeholder="Enter your email" 
            />
            {errors.email && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.email.message}</p>}
          </div>
          

          
          <div>
            <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              {...register('password')} 
              className={`input-field ${errors.password ? 'border-red-300 focus:border-red-500' : ''}`} 
              placeholder="Create a password" 
            />
            {errors.password && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.password.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              {...register('confirmPassword')} 
              className={`input-field ${errors.confirmPassword ? 'border-red-300 focus:border-red-500' : ''}`} 
              placeholder="Confirm your password" 
            />
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.confirmPassword.message}</p>}
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || successMessage}
            className={`btn-emerald w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
              (isLoading || successMessage) ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : successMessage ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging you in...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-600 font-opensans">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium font-roboto text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;