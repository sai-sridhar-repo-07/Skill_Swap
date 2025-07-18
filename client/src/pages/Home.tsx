// src/pages/Home.tsx
import { motion } from 'framer-motion';
import SkillCard from '../components/SkillCard';
import { FaLaptopCode, FaPaintBrush, FaLanguage } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const gradientCard = "bg-gradient-to-br from-white/80 to-white/30 backdrop-blur-lg";

  if (user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-sky-50 to-pink-50 text-gray-800 px-6 py-16 max-w-6xl mx-auto">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-pink-600"
        >
          Welcome back, {user.name.split(' ')[0]}!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-center text-gray-600 mb-12"
        >
          Ready to swap skills today? Choose your next adventure:
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Explore Skills', path: '/explore', desc: 'Find others offering what you want to learn.', badge: 'bg-indigo-100 text-indigo-700', bg: 'from-indigo-50 to-indigo-100' },
            { title: 'Offer a Session', path: '/offer', desc: 'Share your skills with the community.', badge: 'bg-pink-100 text-pink-700', bg: 'from-pink-50 to-pink-100' },
            { title: 'My Sessions', path: '/sessions', desc: 'Manage your upcoming and past sessions.', badge: 'bg-blue-100 text-blue-700', bg: 'from-blue-50 to-blue-100' },
            { title: 'Recommended for You', path: '/recommended', desc: 'Suggestions based on your interests.', badge: 'bg-teal-100 text-teal-700', bg: 'from-teal-50 to-teal-100' },
            { title: 'Community Hub', path: '/community', desc: 'Forums, discussions, and circles.', badge: 'bg-yellow-100 text-yellow-700', bg: 'from-yellow-50 to-yellow-100' },
            { title: 'Leaderboard', path: '/leaderboard', desc: 'Top learners and sharers.', badge: 'bg-emerald-100 text-emerald-700', bg: 'from-emerald-50 to-emerald-100' },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              className={`bg-gradient-to-br ${item.bg} p-5 rounded-xl shadow-md hover:shadow-xl transition`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${item.badge}`}>
                {item.title}
              </span>
              <h3 className="text-lg font-bold mt-4 text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
              <Link to={item.path} className="text-sm text-indigo-600 font-medium hover:underline">
                Go to {item.title}
              </Link>
            </motion.div>
          ))}
        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-24 px-6 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
          Learn Anything. Teach Everything.
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90">
          A peer-to-peer platform to swap skills and grow together.
        </p>
        <Link to="/signup">
          <button className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow hover:bg-gray-100 transition">
            Get Started
          </button>
        </Link>
      </motion.section>

      {/* How it Works */}
      {/* How it Works */}
<section className="pt-20 pb-10 px-6 max-w-6xl mx-auto text-center bg-white text-gray-800 rounded-t-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-extrabold mb-12"
        >
          How it Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Sign Up',
              desc: 'Create your profile and list your skills.',
              bg: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
            },
            {
              step: '2',
              title: 'Match',
              desc: 'Find users who want what you offer.',
              bg: 'bg-gradient-to-br from-pink-100 to-rose-200',
            },
            {
              step: '3',
              title: 'Exchange',
              desc: 'Host or join live learning sessions.',
              bg: 'bg-gradient-to-br from-yellow-100 to-amber-200',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              className={`${item.bg} border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg transition`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-indigo-600 text-4xl font-bold">{item.step}</div>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-700 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Skills Grid */}
      {/* Skills Grid */}
<section className="py-10 px-6 max-w-6xl mx-auto bg-white">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-3xl font-bold text-center mb-10 text-indigo-700"
  >
    Popular Skill Categories
  </motion.h2>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
    {[
      {
        title: 'Web Development',
        description: 'HTML, CSS, JS, React, Backend and more',
        icon: <FaLaptopCode className="text-white text-4xl" />,
        bg: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      },
      {
        title: 'Design',
        description: 'UI/UX, Graphic Design, Branding',
        icon: <FaPaintBrush className="text-white text-4xl" />,
        bg: 'bg-gradient-to-br from-pink-500 to-rose-400',
      },
      {
        title: 'Languages',
        description: 'English, Spanish, Japanese, French',
        icon: <FaLanguage className="text-white text-4xl" />,
        bg: 'bg-gradient-to-br from-teal-500 to-cyan-400',
      },
    ].map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: idx * 0.2 }}
        viewport={{ once: true }}
        className={`${item.bg} text-white rounded-2xl shadow-lg p-6 flex flex-col items-start justify-start hover:shadow-xl transition`}
      >
        <div className="mb-4">{item.icon}</div>
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-sm">{item.description}</p>
      </motion.div>
    ))}
  </div>
</section>


      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 px-6 text-center bg-gradient-to-r from-pink-600 to-purple-600 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Start Teaching or Learning?</h2>
        <p className="mb-6 text-white/90">Join the SkillSwap community now.</p>
        <Link to="/signup">
          <button className="bg-white text-pink-600 py-3 px-8 rounded-full font-semibold hover:bg-gray-100 transition">
            Sign Up Free
          </button>
        </Link>
      </motion.section>
    </main>
  );
};

export default Home;
