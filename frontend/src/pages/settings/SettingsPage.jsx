import { useState } from "react";

const SettingsPage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("9876543210");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Details:", { name, email, phone });
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit" className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
