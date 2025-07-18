// src/pages/OfferSession.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const skills = [
  'Math', 'Physics', 'Biology', 'Computer Science', 'Economics',
  'Web Development', 'Data Science', 'Digital Marketing', 'UI/UX Design',
  'Drawing', 'Photography', 'Music', 'Dance', 'Animation',
  'English', 'French', 'Japanese', 'Hindi', 'Spanish',
  'Cooking', 'Sewing', 'Resume Building', 'Time Management',
  'Yoga', 'Meditation', 'Fitness Training', 'Diet & Nutrition',
  'Chess', 'Rubik’s Cube', 'Video Editing', 'Magic Tricks'
];

const OfferSession = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    topic: '',
    description: '',
    startTime: '',
    duration: '30',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.topic || !form.description || !form.startTime || !form.duration) {
      toast.error('All fields are required.');
      return;
    }

    try {
      await axios.post('/api/sessions', form); // adjust the route as needed
      toast.success('Session created successfully!');
      navigate('/sessions'); // redirect to sessions page
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error creating session');
    }
  };

  return (
    <div className="w-[90%] max-w-3xl mx-auto py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-indigo-700 mb-6"
      >
        🎤 Offer a Learning Session
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-gray-600 mb-10"
      >
        Share your knowledge with the world! Fill out the form to schedule your session.
      </motion.p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        {/* Topic */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Topic</label>
          <select
            name="topic"
            value={form.topic}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select a skill</option>
            {skills.map((skill, idx) => (
              <option key={idx} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="What will you cover in this session?"
            required
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Duration (minutes)</label>
          <select
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        {/* Submit */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-lg shadow-md hover:bg-indigo-700 transition"
          >
            Create Session
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default OfferSession;
