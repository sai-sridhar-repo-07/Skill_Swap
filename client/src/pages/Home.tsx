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

  if (user) {
    // 👤 Logged-in Home View
    return (
      <main className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden px-6 py-16 max-w-6xl mx-auto">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-indigo-700"
        >
          Welcome back, {user.name.split(' ')[0]}!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-center text-gray-600 mb-12"
        >
          Ready to swap skills today? Choose your next action:
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Explore Skills',
              path: '/explore',
              desc: 'Find others offering what you want to learn.',
            },
            {
              title: 'Offer a Session',
              path: '/offer',
              desc: 'Share your skills with the community.',
            },
            {
              title: 'My Sessions',
              path: '/sessions',
              desc: 'Manage your upcoming and past sessions.',
            },
            {
              title: 'Recommended for You',
              path: '/recommended',
              desc: 'Get suggestions based on your interests and activity.',
            },
            {
              title: 'Community Hub',
              path: '/community',
              desc: 'Join forums, discussions, and collaborative learning circles.',
            },
            {
              title: 'Leaderboard',
              path: '/leaderboard',
              desc: 'See top learners and sharers. Climb up the ranks!',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.desc}</p>
              <Link
                to={item.path}
                className="text-indigo-500 font-medium hover:underline"
              >
                Go to {item.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    );
  }

  // 🧑‍🤝‍🧑 Guest Homepage (existing code)
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-20 px-6 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Learn Anything. Teach Everything.</h1>
        <p className="text-lg md:text-xl mb-6">A peer-to-peer platform to swap skills and grow together.</p>
        <Link to="/signup">
          <button className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100">
            Get Started
          </button>
        </Link>
      </motion.section>

      {/* How it Works */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-10"
        >
          How it Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Sign Up', desc: 'Create your profile and list your skills.' },
            { step: '2', title: 'Match', desc: 'Find users who want what you offer.' },
            { step: '3', title: 'Exchange', desc: 'Host or join live learning sessions.' },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-indigo-600 text-4xl font-bold">{item.step}</div>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10"
        >
          Popular Skill Categories
        </motion.h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[FaLaptopCode, FaPaintBrush, FaLanguage].map((Icon, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <SkillCard
                title={['Web Development', 'Design', 'Languages'][idx]}
                description={[
                  'HTML, CSS, JS, React, Backend and more',
                  'UI/UX, Graphic Design, Branding',
                  'English, Spanish, Japanese, French',
                ][idx]}
                icon={<Icon />}
              />
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
        className="py-16 px-6 text-center bg-indigo-600 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Start Teaching or Learning?</h2>
        <p className="mb-6">Join the SkillSwap community now.</p>
        <Link to="/signup">
          <button className="bg-white text-indigo-600 py-2 px-6 rounded-full font-semibold hover:bg-gray-100">
            Sign Up Free
          </button>
        </Link>
      </motion.section>
    </main>
  );
};

export default Home;
