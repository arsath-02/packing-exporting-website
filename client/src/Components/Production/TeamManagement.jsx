import React, { useState } from 'react';
import { FaUserCog, FaUserEdit } from 'react-icons/fa';
import { MdDashboard, MdContentCut, MdOutlineLogout } from 'react-icons/md';
import { GiSewingNeedle } from 'react-icons/gi';
import { AiOutlineTeam } from 'react-icons/ai';
import { BsCalendar2Check } from 'react-icons/bs';
import Sidebar from './Sidebar';

const teamData = [
  {
    initials: 'SJ',
    name: 'Sarah Johnson',
    id: 'EMP002',
    position: 'Senior Cutter',
    skills: ['Pattern Making', 'Fabric Cutting', 'Machine Operation'],
    experience: '5 years',
    status: 'Present',
    performance: 'Excellent',
  },
  {
    initials: 'MB',
    name: 'Michael Brown',
    id: 'EMP003',
    position: 'Senior Stitcher',
    skills: ['Machine Stitching', 'Quality Control', 'Pattern Assembly'],
    experience: '6 years',
    status: 'Present',
    performance: 'Excellent',
  },
  {
    initials: 'DW',
    name: 'David Wilson',
    id: 'EMP005',
    position: 'Cutter',
    skills: ['Fabric Cutting', 'Machine Operation'],
    experience: '3 years',
    status: 'Present',
    performance: 'Good',
  },
  {
    initials: 'LT',
    name: 'Lisa Thompson',
    id: 'EMP007',
    position: 'Cutter',
    skills: ['Fabric Cutting', 'Pattern Making'],
    experience: '2 years',
    status: 'Present',
    performance: 'Good',
  },
  {
    initials: 'JW',
    name: 'James Wilson',
    id: 'EMP008',
    position: 'Stitcher',
    skills: ['Machine Stitching', 'Hand Stitching'],
    experience: '4 years',
    status: 'Present',
    performance: 'Good',
  },
  {
    initials: 'RG',
    name: 'Robert Garcia',
    id: 'EMP009',
    position: 'Junior Cutter',
    skills: ['Fabric Cutting'],
    experience: '1 year',
    status: 'Present',
    performance: 'Average',
  },
];

const StatusTag = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
    status === 'Present' ? 'bg-green-700 text-white' : 'bg-gray-400 text-white'
  }`}>{status}</span>
);

const PerformanceTag = ({ performance }) => {
  let styles = 'px-2 py-1 rounded-full text-sm font-medium ';
  if (performance === 'Excellent') styles += 'bg-green-600 text-white';
  else if (performance === 'Good') styles += 'bg-blue-500 text-white';
  else styles += 'bg-yellow-500 text-white';

  return <span className={styles}>{performance}</span>;
};

const TeamManagement = () => {
  const [filter, setFilter] = useState('All');

  const filteredData =
    filter === 'All'
      ? teamData
      : teamData.filter((member) =>
          filter === 'Cutting'
            ? member.position.toLowerCase().includes('cutter')
            : member.position.toLowerCase().includes('stitch')
        );

  return (
    <div className="flex h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <Sidebar />
    
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Production Team Management</h2>
            <p className="text-gray-400 mt-1">Manage your cutting and stitching team members.</p>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2">
            <BsCalendar2Check /> Today’s Attendance
          </button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-4 gap-4 my-6">
          <div className="bg-zinc-800 p-5 rounded-lg">
            <p className="text-lg">Team Size</p>
            <h3 className="text-2xl font-bold">8</h3>
            <p className="text-sm text-gray-400 mt-1">Total production team members</p>
          </div>
          <div className="bg-zinc-800 p-5 rounded-lg">
            <p className="text-lg">Present Today</p>
            <h3 className="text-2xl font-bold">7</h3>
            <p className="text-sm text-gray-400 mt-1">88% attendance</p>
          </div>
          <div className="bg-zinc-800 p-5 rounded-lg">
            <p className="text-lg">Cutting Team</p>
            <h3 className="text-2xl font-bold">4</h3>
            <p className="text-sm text-gray-400 mt-1">Pattern making and cutting</p>
          </div>
          <div className="bg-zinc-800 p-5 rounded-lg">
            <p className="text-lg">Stitching Team</p>
            <h3 className="text-2xl font-bold">4</h3>
            <p className="text-sm text-gray-400 mt-1">Machine and hand stitching</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-4">
          {['All', 'Cutting', 'Stitching'].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-md ${
                filter === type ? 'bg-white text-black' : 'bg-zinc-700 text-white'
              }`}
              onClick={() => setFilter(type)}
            >
              {type} Team
            </button>
          ))}
        </div>

        {/* Team Table */}
        <div className="bg-zinc-900 rounded-lg p-4">
          <h3 className="text-xl font-bold mb-4">Production Team Members</h3>
          <table className="w-full text-left">
            <thead className="border-b border-zinc-700">
              <tr>
                <th>Employee</th>
                <th>Position</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Performance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((member) => (
                <tr key={member.id} className="border-b border-zinc-800 hover:bg-zinc-800">
                  <td className="py-3 flex items-center gap-3">
                    <div className="bg-zinc-700 rounded-full w-10 h-10 flex items-center justify-center text-white">
                      {member.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.id}</p>
                    </div>
                  </td>
                  <td>{member.position}</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill) => (
                        <span key={skill} className="bg-zinc-700 text-white px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{member.experience}</td>
                  <td><StatusTag status={member.status} /></td>
                  <td><PerformanceTag performance={member.performance} /></td>
                  <td className="flex gap-2">
                    <button className="bg-zinc-700 p-2 rounded-full"><FaUserEdit /></button>
                    <button className="bg-zinc-700 p-2 rounded-full"><FaUserCog /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TeamManagement;
