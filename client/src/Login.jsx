import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    department: '',
  });
  const [error, setError] = useState('');

  const departments = ['dyeing', 'production', 'quality', 'hr'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department,
      });
      console.log(response.data.user._id);
      localStorage.setItem("id",response.data.user._id);
      if (response.status === 200) {
        // Assuming the backend now returns user details (e.g., userId, role) instead of a token
        const { role, department } = formData;
        if (role === 'customer') {
          navigate('/Customer/dashboard');
        } else if (role === 'manager') {
          navigate('/Manager/dashboard');
        } else if (role === 'supervisor') {
          switch (department.toLowerCase()) {
            case 'dyeing':
              navigate('/Dyeing/dashboard');
              break;
            case 'production':
              navigate('/Production/dashboard');
              break;
            case 'quality':
              navigate('/Quality/dashboard');
              break;
            case 'hr':
              navigate('/Hr/dashboard');
              break;
            default:
              navigate('/Components/supervisor');
          }
        }
      }
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4">
      <div className="text-white text-center mb-8">
        <h1 className="text-3xl font-bold">Garment Order Processing System</h1>
        <p className="mt-2 text-sm text-gray-400">Login to manage and track your garment orders</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1e1e] p-8 rounded-xl shadow-md w-full max-w-md text-white"
      >
        <h2 className="text-xl font-semibold mb-2">Login</h2>
        <p className="text-sm text-gray-400 mb-6">Enter your credentials to access your account</p>

        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error */}

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
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
