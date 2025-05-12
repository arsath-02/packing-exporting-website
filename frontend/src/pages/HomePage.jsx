import { Link } from 'react-router-dom';
import textileImg from '../assets/textile-hero.jpg'; // 🎯 Add this image in your /src/assets folder
import feature1 from '../assets/feature1.jpg';       // Optional: add 3 images or use online links
import feature2 from '../assets/feature1.jpg';
import feature3 from '../assets/feature1.jpg';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">

      {/* Hero Section */}
      <div className="relative w-full h-[500px]">
        <img src={textileImg} alt="Textile Industry" className="absolute w-full h-full object-cover opacity-70" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to Textile Management System
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl drop-shadow">
            Simplify your operations, manage employees, track attendance, and automate payroll — all in one place 🧵💼
          </p>
          <div className="space-x-4">
            <Link to="/login">
              <button className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition shadow-lg">
                Login
              </button>
            </Link>
            <Link to="/contact">
            <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-400 transition">
              Contact Us
            </button>
            </Link>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">What You Can Do 👇</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <img src={feature1} alt="Employee Management" className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold mb-2">Employee Management</h3>
            <p className="text-gray-600">Add, update, and manage all employee details from a single place.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <img src={feature2} alt="Attendance Tracking" className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold mb-2">Attendance Tracking</h3>
            <p className="text-gray-600">Mark attendance and monitor records with real-time updates.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <img src={feature3} alt="Payroll System" className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold mb-2">Payroll System</h3>
            <p className="text-gray-600">Calculate salaries, bonuses, and deductions automatically.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-4 text-center text-sm">
        © 2025 Smart Textile Management. All rights reserved. 👕🧶
      </footer>
    </div>
  );
};

export default HomePage;
