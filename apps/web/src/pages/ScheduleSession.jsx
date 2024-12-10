import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import BackgroundEffects from '../components/learning/BackgroundEffects';
import { FiCalendar, FiClock, FiUsers, FiVideo, FiMessageSquare, FiGlobe } from 'react-icons/fi';

const SessionTypeCard = ({ type, isSelected, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onSelect}
    className={`p-6 rounded-xl cursor-pointer transition-all ${
      isSelected
        ? 'bg-violet-500/20 border-violet-500/50'
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    } border`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-lg bg-white/5">
          {type.icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">{type.name}</h3>
          <p className="text-sm text-gray-400">{type.duration} minutes</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        type.category === 'One-on-One' 
          ? 'bg-blue-500/20 text-blue-300'
          : 'bg-green-500/20 text-green-300'
      }`}>
        {type.category}
      </span>
    </div>
    <p className="text-gray-400 mb-4">{type.description}</p>
    
    {/* Show features if available */}
    {type.features && (
      <div className="mb-4 pt-4 border-t border-white/10">
        <p className="text-sm font-medium text-white mb-2">Session includes:</p>
        <ul className="space-y-2">
          {type.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-400">
              <svg className="w-4 h-4 mr-2 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    <div className="flex items-center justify-between text-sm text-gray-400">
      <span>{type.price}</span>
      <span>{type.maxParticipants} participants max</span>
    </div>
  </motion.div>
);

const TimeSlot = ({ slot, isSelected, onSelect, isAvailable = true }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => isAvailable && onSelect()}
    disabled={!isAvailable}
    className={`w-full p-4 rounded-xl border transition-all ${
      !isAvailable 
        ? 'bg-gray-900/50 border-gray-800 cursor-not-allowed opacity-50'
        : isSelected
        ? 'bg-violet-500/20 border-violet-500/50'
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <FiClock className="w-5 h-5 text-gray-400" />
        <span className="text-white font-medium">{slot.time}</span>
      </div>
      {!isAvailable && (
        <span className="text-xs text-red-400">Booked</span>
      )}
    </div>
  </motion.button>
);

const communicationMethods = [
  {
    id: 'zoom',
    name: 'Zoom Meeting',
    icon: <FiVideo className="w-6 h-6 text-blue-400" />,
    description: 'Video call via Zoom'
  },
  {
    id: 'gmeet',
    name: 'Google Meet',
    icon: <FiVideo className="w-6 h-6 text-green-400" />,
    description: 'Video call via Google Meet'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: <FiMessageSquare className="w-6 h-6 text-purple-400" />,
    description: 'Voice/Video call via Discord'
  }
];

const sessionTypes = [
  {
    id: 'one-on-one',
    name: 'One-on-One Mentoring',
    category: 'One-on-One',
    duration: 45,
    price: '$75',
    maxParticipants: 1,
    description: 'Personal mentoring session focused on your specific needs and questions',
    icon: <FiUsers className="w-6 h-6 text-blue-400" />
  },
  {
    id: 'code-review',
    name: 'Code Review Session',
    category: 'One-on-One',
    duration: 30,
    price: '$50',
    maxParticipants: 1,
    description: 'Detailed review of your code with suggestions for improvement',
    icon: <FiVideo className="w-6 h-6 text-green-400" />
  },
  {
    id: 'english-comm',
    name: 'English Communication',
    category: 'One-on-One',
    duration: 40,
    price: '$60',
    maxParticipants: 1,
    description: 'Practice technical English, interview prep, and presentation skills',
    icon: <FiMessageSquare className="w-6 h-6 text-yellow-400" />,
    features: [
      'Technical vocabulary practice',
      'Mock interview scenarios',
      'Presentation feedback',
      'Email/documentation writing',
      'Pronunciation guidance'
    ]
  },
  {
    id: 'group',
    name: 'Group Workshop',
    category: 'Group',
    duration: 60,
    price: '$40/person',
    maxParticipants: 5,
    description: 'Interactive workshop covering specific topics with hands-on exercises',
    icon: <FiUsers className="w-6 h-6 text-purple-400" />
  }
];

const timeSlots = [
  { id: 1, time: '9:00 AM', available: true },
  { id: 2, time: '10:00 AM', available: false },
  { id: 3, time: '11:00 AM', available: true },
  { id: 4, time: '2:00 PM', available: true },
  { id: 5, time: '3:00 PM', available: true },
  { id: 6, time: '4:00 PM', available: false }
];

const CommunicationMethodCard = ({ method, isSelected, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onSelect}
    className={`p-4 rounded-xl cursor-pointer transition-all ${
      isSelected
        ? 'bg-violet-500/20 border-violet-500/50'
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    } border`}
  >
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-lg bg-white/5">
        {method.icon}
      </div>
      <div>
        <h3 className="text-white font-medium">{method.name}</h3>
        <p className="text-sm text-gray-400">{method.description}</p>
      </div>
    </div>
  </motion.div>
);

const SessionSummary = ({ 
  selectedType, 
  selectedDate, 
  selectedSlot, 
  selectedMethod, 
  timezone,
  additionalNotes 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
  >
    <h2 className="text-xl font-semibold text-white mb-6">Session Summary</h2>
    <div className="space-y-4">
      {/* Session Type */}
      <div className="flex items-start justify-between pb-4 border-b border-white/10">
        <div>
          <p className="text-gray-400">Session Type</p>
          <p className="text-white font-medium">{selectedType.name}</p>
          <p className="text-sm text-gray-400">{selectedType.duration} minutes</p>
        </div>
        <span className="text-white font-medium">{selectedType.price}</span>
      </div>

      {/* Date & Time */}
      <div className="flex items-start justify-between pb-4 border-b border-white/10">
        <div>
          <p className="text-gray-400">Date & Time</p>
          <p className="text-white font-medium">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-sm text-gray-400">{selectedSlot.time} ({timezone})</p>
        </div>
        <div className="flex items-center text-green-400">
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">Available</span>
        </div>
      </div>

      {/* Communication Method */}
      <div className="flex items-start justify-between pb-4 border-b border-white/10">
        <div>
          <p className="text-gray-400">Communication Method</p>
          <p className="text-white font-medium">{selectedMethod.name}</p>
          <p className="text-sm text-gray-400">{selectedMethod.description}</p>
        </div>
        <div className="p-2 rounded-lg bg-white/5">
          {selectedMethod.icon}
        </div>
      </div>

      {/* Additional Notes */}
      {additionalNotes && (
        <div className="pt-2">
          <p className="text-gray-400 mb-2">Additional Notes</p>
          <p className="text-sm text-white">{additionalNotes}</p>
        </div>
      )}

      {/* Payment Preview */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Session Fee</span>
          <span className="text-white font-medium">{selectedType.price}</span>
        </div>
        {selectedType.category === 'Group' && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Per Person</span>
            <span className="text-sm text-gray-400">
              (up to {selectedType.maxParticipants} participants)
            </span>
          </div>
        )}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
          <span className="text-white font-medium">Total</span>
          <span className="text-xl font-semibold text-white">{selectedType.price}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const ScheduleSession = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [communicationDetails, setCommunicationDetails] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedType || !selectedDate || !selectedSlot) {
      toast.error('Please select all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Session scheduled successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to schedule session');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <BackgroundEffects variant="learning" />
      <Navbar />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                Schedule a Session
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-gray-400"
            >
              Choose your preferred session type and time
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Session Types */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Select Session Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessionTypes.map(type => (
                  <SessionTypeCard
                    key={type.id}
                    type={type}
                    isSelected={selectedType?.id === type.id}
                    onSelect={() => setSelectedType(type)}
                  />
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Select Date</h2>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 
                      text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-white">Select Time</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {timeSlots.map(slot => (
                    <TimeSlot
                      key={slot.id}
                      slot={slot}
                      isSelected={selectedSlot?.id === slot.id}
                      onSelect={() => setSelectedSlot(slot)}
                      isAvailable={slot.available}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Communication Section */}
            {selectedSlot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Communication Method */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">Communication Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {communicationMethods.map(method => (
                      <CommunicationMethodCard
                        key={method.id}
                        method={method}
                        isSelected={selectedMethod?.id === method.id}
                        onSelect={() => setSelectedMethod(method)}
                      />
                    ))}
                  </div>
                </div>

                {/* Communication Details */}
                {selectedMethod && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        {selectedMethod.id === 'discord' ? 'Discord Username' : 'Preferred Email'}
                      </label>
                      <input
                        type="text"
                        value={communicationDetails}
                        onChange={(e) => setCommunicationDetails(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                          text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder={selectedMethod.id === 'discord' 
                          ? 'Enter your Discord username'
                          : 'Enter your email for meeting link'
                        }
                      />
                    </div>

                    {/* Timezone Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        <div className="flex items-center space-x-2">
                          <FiGlobe className="w-4 h-4" />
                          <span>Your Timezone</span>
                        </div>
                      </label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                          text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        {Intl.supportedValuesOf('timeZone').map(tz => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        rows="4"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                          text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                        placeholder="Any specific topics you'd like to discuss or questions you have..."
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Show Summary when all required fields are filled */}
            {selectedType && selectedDate && selectedSlot && selectedMethod && communicationDetails && (
              <SessionSummary
                selectedType={selectedType}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                selectedMethod={selectedMethod}
                timezone={timezone}
                additionalNotes={additionalNotes}
              />
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !selectedType || !selectedDate || !selectedSlot || !selectedMethod || !communicationDetails}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 rounded-xl relative group overflow-hidden
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
                to-fuchsia-500 opacity-100 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 
                to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <span className="relative z-10 font-medium text-white flex items-center justify-center">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full 
                    animate-spin"/>
                ) : (
                  'Confirm & Pay'
                )}
              </span>
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSession; 