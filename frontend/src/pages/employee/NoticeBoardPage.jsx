// src/pages/employee/NoticeBoardPage.jsx
import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar";

// Emojis for reactions
const emojis = ["👍", "❤️", "😢", "😂", "🔥"];

const NoticeBoardPage = () => {
  const [notices, setNotices] = useState([
    { 
      id: 1, 
      title: "Team Meeting", 
      content: "We have a meeting tomorrow at 10 AM.", 
      reaction: null,
      isMeeting: true,
      attendanceStatus: null // null: not answered, 'attending': will attend, 'notAttending': will not attend
    },
    { 
      id: 2, 
      title: "Holiday Announcement", 
      content: "The office will be closed on Friday for a holiday.", 
      reaction: null,
      isMeeting: false,
      attendanceStatus: null
    },
  ]);

  const handleReaction = (noticeId, emoji) => {
    setNotices(notices.map((notice) =>
      notice.id === noticeId
        ? { ...notice, reaction: emoji }
        : notice
    ));
  };

  const handleAttendance = (noticeId, status) => {
    setNotices(notices.map((notice) =>
      notice.id === noticeId
        ? { ...notice, attendanceStatus: status }
        : notice
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <TopNavbar role="employee" />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Notice Board 📝</h1>

        {/* Notice Cards */}
        <div className="space-y-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="group bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-blue-700">{notice.title}</h3>
              <p className="mt-2 text-gray-700">{notice.content}</p>

              {/* Meeting Attendance Checkboxes */}
              {notice.isMeeting && (
                <div className="mt-4 flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`attend-${notice.id}`}
                      checked={notice.attendanceStatus === 'attending'}
                      onChange={() => handleAttendance(notice.id, 'attending')}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <label htmlFor={`attend-${notice.id}`} className="ml-2 text-gray-700 font-medium">
                      Will Attend
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`not-attend-${notice.id}`}
                      checked={notice.attendanceStatus === 'notAttending'}
                      onChange={() => handleAttendance(notice.id, 'notAttending')}
                      className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                    />
                    <label htmlFor={`not-attend-${notice.id}`} className="ml-2 text-gray-700 font-medium">
                      Will Not Attend
                    </label>
                  </div>
                </div>
              )}

              {/* Reactions Section - will show up on hover */}
              <div className="mt-4 items-center group-hover:block hidden">
                <span className="mr-2 text-lg font-medium text-gray-700">React:</span>
                <div className="flex space-x-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleReaction(notice.id, emoji)}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display the single reaction */}
              {notice.reaction && (
                <div className="mt-4 flex space-x-2">
                  <span className="text-3xl">{notice.reaction}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoardPage;