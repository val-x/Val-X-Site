import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import BackgroundEffects from '../components/learning/BackgroundEffects';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - replace with actual user data from your auth system
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Student',
    bio: 'Passionate about learning and technology.',
    location: 'New York, USA',
    website: 'https://johndoe.dev',
    github: 'johndoe',
    linkedin: 'johndoe',
    twitter: 'johndoe',
    skills: ['Python', 'Machine Learning', 'Web Development'],
    interests: ['AI', 'Data Science', 'Cloud Computing'],
    achievements: [
      {
        id: 1,
        title: 'Quick Learner',
        description: 'Completed 5 courses in one month',
        date: '2024-02-15',
        icon: '🚀'
      },
      {
        id: 2,
        title: 'Perfect Score',
        description: 'Achieved 100% in Advanced AI',
        date: '2024-02-10',
        icon: '🎯'
      }
    ],
    certifications: [
      {
        id: 1,
        name: 'AI Fundamentals',
        issuer: 'VAL-X',
        date: '2024-01',
        credential: 'CERT-123'
      },
      {
        id: 2,
        name: 'Machine Learning Expert',
        issuer: 'VAL-X',
        date: '2024-02',
        credential: 'CERT-456'
      }
    ],
    stats: {
      coursesCompleted: 12,
      hoursLearned: 156,
      streak: 7,
      points: 2450
    }
  });

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'settings', label: 'Settings' }
  ];

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const StatCard = ({ label, value, icon }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 
          to-fuchsia-500/10 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black">
      <BackgroundEffects variant="profile" />
      <Navbar />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 
                  to-fuchsia-500 flex items-center justify-center text-3xl font-bold text-white">
                  {userData.name.charAt(0)}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white/10 
                    text-white hover:bg-white/20 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
                    <p className="text-gray-400">{userData.role}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 
                      transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                      />
                    </svg>
                    <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                  </button>
                </div>

                {isEditing ? (
                  <div className="mt-4 space-y-4">
                    <textarea
                      value={userData.bio}
                      onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                        text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                        focus:ring-violet-500"
                      rows="3"
                      placeholder="Tell us about yourself..."
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 
                          via-violet-500 to-fuchsia-500 text-white font-medium 
                          hover:opacity-90 transition-opacity"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-gray-300">{userData.bio}</p>
                )}

                {/* Social Links */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {userData.website && (
                    <a
                      href={userData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-400 hover:text-white 
                        transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                        />
                      </svg>
                      <span>Website</span>
                    </a>
                  )}
                  {/* Add other social links similarly */}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Courses Completed"
              value={userData.stats.coursesCompleted}
              icon={
                <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                  />
                </svg>
              }
            />
            <StatCard
              label="Hours Learned"
              value={userData.stats.hoursLearned}
              icon={
                <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              }
            />
            <StatCard
              label="Day Streak"
              value={userData.stats.streak}
              icon="🔥"
            />
            <StatCard
              label="Points Earned"
              value={userData.stats.points}
              icon="⭐"
            />
          </div>

          {/* Tabs Navigation */}
          <div className="flex space-x-1 mb-6 border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                      from-cyan-500 via-violet-500 to-fuchsia-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skills */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 
                          text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h2 className="text-xl font-semibold text-white mb-4">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {userData.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 
                          text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userData.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h3 className="text-white font-medium">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{achievement.date}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'certifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{cert.name}</h3>
                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                        <p className="text-xs text-gray-500 mt-2">Issued: {cert.date}</p>
                      </div>
                      <button
                        onClick={() => {
                          // Handle certificate verification
                          toast.success('Certificate verified!');
                        }}
                        className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 
                          hover:bg-white/10 transition-colors text-sm"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>
                {/* Add settings form here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 