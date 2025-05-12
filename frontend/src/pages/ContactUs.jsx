// src/pages/ContactUs.jsx

const ContactUs = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-700">Contact Us</h1>
        <p className="text-gray-700 max-w-xl text-center mb-8">
          Got questions or need help? Fill out the form below and we’ll get back to you as soon as possible.
        </p>
  
        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    );
  };
  
  export default ContactUs;
  