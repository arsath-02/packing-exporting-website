import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name:'',
    phone: '',
    email: '',
    password: '',
    role: '',
    department: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

  const departments = ['dyeing', 'production', 'quality', 'hr'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'role' && value !== 'supervisor' ? { department: '' } : {})
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');
  
    try {
      // Only include department if role is 'supervisor'
      const payload = { ...formData };
      if (formData.role !== 'supervisor') {
        delete payload.department;
      }
  
      const response = await axios.post('http://localhost:5000/api/auth/register', payload);
      setMessage(response.data.message);
      navigate('/');
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Server error');
    } finally {
      setIsLoading(false);
     
    }
  };
  

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4">
      <div className="text-white text-center mb-8">
        <h1 className="text-3xl font-bold">Garment Order Processing System</h1>
        <p className="mt-2 text-sm text-gray-400">Register to access your dashboard</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1e1e] p-8 rounded-xl shadow-md w-full max-w-md text-white"
      >
        <h2 className="text-xl font-semibold mb-2">Register</h2>
        <p className="text-sm text-gray-400 mb-6">Create your account by filling the form</p>

        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="name"
            name="name"
            placeholder="Aneesh"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="phone"
            name="phone"
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Role</label>
          <div className="space-y-2 text-sm text-gray-300">
            {['customer', 'manager', 'supervisor'].map((roleOption) => (
              <label key={roleOption} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value={roleOption}
                  checked={formData.role === roleOption}
                  onChange={handleChange}
                  required
                />
                {roleOption}
              </label>
            ))}
          </div>
        </div>

        {formData.role === 'supervisor' && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-black font-medium py-2 rounded hover:bg-gray-200 transition"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
        <p className="mt-4 text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/" className="text-blue-500 hover:underline">
            Login here
            </a>
        </p>
        
    </div>
  );
};

export default RegisterPage;
