// src/pages/ExploreSkills.tsx

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaBrain,
  FaLaptopCode,
  FaPalette,
  FaLanguage,
  FaLeaf,
  FaUserFriends,
  FaGamepad,
} from 'react-icons/fa';

const categories = [
  {
    title: 'Academic',
    icon: <FaBrain className="text-pink-500 text-3xl" />,
    color: 'bg-pink-100',
    text: 'text-pink-700',
    skillColor: 'bg-pink-200 hover:bg-pink-300',
    skills: ['Math', 'Physics', 'Biology', 'Computer Science', 'Economics'],
  },
  {
    title: 'Professional & Tech',
    icon: <FaLaptopCode className="text-blue-600 text-3xl" />,
    color: 'bg-blue-100',
    text: 'text-blue-700',
    skillColor: 'bg-blue-200 hover:bg-blue-300',
    skills: ['Web Development', 'Data Science', 'Digital Marketing', 'UI/UX Design'],
  },
  {
    title: 'Creative Arts',
    icon: <FaPalette className="text-yellow-600 text-3xl" />,
    color: 'bg-yellow-100',
    text: 'text-yellow-700',
    skillColor: 'bg-yellow-200 hover:bg-yellow-300',
    skills: ['Drawing', 'Photography', 'Music', 'Dance', 'Animation'],
  },
  {
    title: 'Languages',
    icon: <FaLanguage className="text-purple-600 text-3xl" />,
    color: 'bg-purple-100',
    text: 'text-purple-700',
    skillColor: 'bg-purple-200 hover:bg-purple-300',
    skills: ['English', 'French', 'Japanese', 'Hindi', 'Spanish'],
  },
  {
    title: 'Life Skills',
    icon: <FaUserFriends className="text-green-700 text-3xl" />,
    color: 'bg-green-100',
    text: 'text-green-700',
    skillColor: 'bg-green-200 hover:bg-green-300',
    skills: ['Cooking', 'Sewing', 'Resume Building', 'Time Management'],
  },
  {
    title: 'Wellness',
    icon: <FaLeaf className="text-emerald-600 text-3xl" />,
    color: 'bg-emerald-100',
    text: 'text-emerald-700',
    skillColor: 'bg-emerald-200 hover:bg-emerald-300',
    skills: ['Yoga', 'Meditation', 'Fitness Training', 'Diet & Nutrition'],
  },
  {
    title: 'Fun & Others',
    icon: <FaGamepad className="text-red-600 text-3xl" />,
    color: 'bg-red-100',
    text: 'text-red-700',
    skillColor: 'bg-red-200 hover:bg-red-300',
    skills: ['Chess', 'Rubik’s Cube', 'Video Editing', 'Magic Tricks'],
  },
];

const ExploreSkills = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        🌟 Explore Skills
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`rounded-2xl shadow-lg p-6 ${category.color}`}
          >
            <div className="flex items-center gap-3 mb-4">
              {category.icon}
              <h2 className={`text-xl font-semibold ${category.text}`}>{category.title}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition ${category.skillColor} ${category.text}`}
                  onClick={() =>
                    navigate(`/skills/${skill.toLowerCase().replace(/\s+/g, '-')}`)
                  }
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSkills;
