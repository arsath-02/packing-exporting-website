import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
  
        // Navigate based on role
        if (data.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (data.role === 'employee') {
          navigate('/employee/dashboard');
        }
      } else {
        setError(data.message || 'Login failed. Try again.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Welcome Back 👋</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <span
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-blue-600 hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Login 🚀
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Login using credentials shared by your Admin 📩
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
