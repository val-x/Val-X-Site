export const enrollUser = (userData, programId) => {
  console.log('Enrolling in program:', programId);
  
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '{}');
  
  enrollments[programId] = {
    ...userData,
    enrolledAt: new Date().toISOString(),
    programId
  };
  
  localStorage.setItem('enrollments', JSON.stringify(enrollments));
};

export const checkEnrollment = (programId) => {
  console.log('Checking enrollment for:', programId);
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '{}');
  return !!enrollments[programId];
};

export const getUserEnrollments = () => {
  return JSON.parse(localStorage.getItem('enrollments') || '{}');
};

export const getUserProgress = (programId) => {
  try {
    const progress = localStorage.getItem(`progress_${programId}`);
    if (progress) {
      return JSON.parse(progress);
    }
    // Return default progress if none exists
    return {
      completed: 0,
      total: 10, // This should match your actual program modules/lessons count
      lastAccessed: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting user progress:', error);
    return null;
  }
};

export const updateUserProgress = (programId, progress) => {
  try {
    localStorage.setItem(`progress_${programId}`, JSON.stringify({
      ...progress,
      lastAccessed: new Date().toISOString()
    }));
    return true;
  } catch (error) {
    console.error('Error updating user progress:', error);
    return false;
  }
}; 