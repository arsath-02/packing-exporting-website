import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [role, setRole] = useState('manager');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === 'manager') {
      navigate('/Manager/Orders');
    } else if (role === 'packingEmployee') {
      navigate('/Packing/approved');
    } else if (role === 'transportEmployee') {
      navigate('/Transport/dispatch');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-white">
      <div className="w-full max-w-md px-6 py-12 bg-white shadow-md rounded-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="grid">
            <label htmlFor="email" className="text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Password */}
          <div className="grid">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-900">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Role */}
          <div className="grid">
            <label htmlFor="role" className="text-sm font-medium text-gray-900">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="manager">Manager</option>
              <option value="packingEmployee">Packing Employee</option>
              <option value="transportEmployee">Transport Employee</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
